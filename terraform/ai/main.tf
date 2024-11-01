data "aws_caller_identity" "current" {}

data "aws_partition" "current" {}

data "aws_region" "current" {}

data "aws_iam_policy_document" "agent_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      identifiers = ["bedrock.amazonaws.com"]
      type        = "Service"
    }
    condition {
      test     = "StringEquals"
      values   = [data.aws_caller_identity.current.account_id]
      variable = "aws:SourceAccount"
    }
    condition {
      test     = "ArnLike"
      values   = ["arn:${data.aws_partition.current.partition}:bedrock:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:agent/*"]
      variable = "AWS:SourceArn"
    }
  }
}

data "aws_iam_policy_document" "agent_permissions" {
  statement {
    actions = ["bedrock:InvokeModel"]
    resources = [
      "arn:${data.aws_partition.current.partition}:bedrock:${data.aws_region.current.name}::foundation-model/${var.ai_model}",
    ]
  }
}

resource "aws_iam_role" "bedrock_agent" {
  assume_role_policy = data.aws_iam_policy_document.agent_trust.json
  name_prefix        = "AmazonBedrockExecutionRoleForAgents_"
}

resource "aws_iam_role_policy" "bedrock_agent" {
  policy = data.aws_iam_policy_document.agent_permissions.json
  role   = aws_iam_role.bedrock_agent.id
}

resource "aws_bedrockagent_agent" "bedrock_agent_unregistered_user" {
  agent_name                  = "${var.stack_name}-bedrock-agent-for-unregistered-users-${var.agent_suffix}"
  agent_resource_role_arn     = aws_iam_role.bedrock_agent.arn
  idle_session_ttl_in_seconds = 500
  foundation_model            = var.ai_model
  instruction                 = var.ai_instruction
}

resource "aws_bedrockagent_agent" "bedrock_agent_registered_user" {
  agent_name                  = "${var.stack_name}-bedrock-agent-for-registered-user-${var.agent_suffix}"
  agent_resource_role_arn     = aws_iam_role.bedrock_agent.arn
  idle_session_ttl_in_seconds = 500
  foundation_model            = var.ai_model
  instruction                 = var.ai_instruction
}

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "bedrock_agent_lambda" {
  name = "${var.stack_name}-bedrock-agent-lambda-role-${var.agent_suffix}"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "bedrock_agent_lambda_basic_execution_role_attachment" {
  role       = aws_iam_role.bedrock_agent_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "bedrock_agent" {
  function_name    = "${var.stack_name}-bedrock-agent-lambda-${var.agent_suffix}"
  handler          = "app.lambda_handler"
  runtime          = "python3.12"
  memory_size      = 1024
  timeout          = 30
  role             = aws_iam_role.bedrock_agent_lambda.arn
  filename         = var.package_path
  architectures    = ["arm64"]
  source_code_hash = var.source_code_hash
}

resource "aws_lambda_permission" "allow_execution_from_bedrock_agent_1" {
  statement_id  = "AllowExecutionFromBedrockAgent1"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bedrock_agent.function_name
  principal     = "bedrock.amazonaws.com"
  source_arn    = aws_bedrockagent_agent.bedrock_agent_unregistered_user.agent_arn
}

resource "aws_lambda_permission" "allow_execution_from_bedrock_agent_2" {
  statement_id  = "AllowExecutionFromBedrockAgent2"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bedrock_agent.function_name
  principal     = "bedrock.amazonaws.com"
  source_arn    = aws_bedrockagent_agent.bedrock_agent_registered_user.agent_arn
}

resource "aws_bedrockagent_agent_action_group" "bedrock_agent_action_group_1" {
  action_group_name          = "bedrock-agent-action-group"
  agent_id                   = aws_bedrockagent_agent.bedrock_agent_unregistered_user.id
  agent_version              = "DRAFT"
  skip_resource_in_use_check = true
  action_group_executor {
    lambda = aws_lambda_function.bedrock_agent.arn
  }
  api_schema {
    payload = file(var.unregistered_user_api_schema)
  }
}

resource "aws_bedrockagent_agent_action_group" "bedrock_agent_action_group_2" {
  action_group_name          = "bedrock-agent-action-group"
  agent_id                   = aws_bedrockagent_agent.bedrock_agent_registered_user.id
  agent_version              = "DRAFT"
  skip_resource_in_use_check = true
  action_group_executor {
    lambda = aws_lambda_function.bedrock_agent.arn
  }
  api_schema {
    payload = file(var.registered_user_api_schema)
  }
}

resource "aws_bedrockagent_agent_alias" "bedrock_agent_alias_1" {
  agent_id = aws_bedrockagent_agent.bedrock_agent_unregistered_user.id
  agent_alias_name = var.environment
}

resource "aws_bedrockagent_agent_alias" "bedrock_agent_alias_2" {
  agent_id = aws_bedrockagent_agent.bedrock_agent_registered_user.id
  agent_alias_name = var.environment
}