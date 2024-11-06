data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

data "aws_ecr_authorization_token" "ecr_auth_token" {}

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

provider "docker" {
  registry_auth {
    address  = format("%v.dkr.ecr.%v.amazonaws.com", data.aws_caller_identity.current.account_id, data.aws_region.current.name)
    username = data.aws_ecr_authorization_token.ecr_auth_token.user_name
    password = data.aws_ecr_authorization_token.ecr_auth_token.password
  }
}

module "docker_image" {
  source = "terraform-aws-modules/lambda/aws//modules/docker-build"
  create_ecr_repo = true
  ecr_repo        = "express-app"
  use_image_tag = true
  image_tag     = "1.0"
  source_path     = var.source_path
}

module "dynamodb_table" {
  source = "./dynamo_table"

  stack_name = var.stack_name
  table_suffix = var.deployment_id
}

resource "aws_iam_role" "backend_role" {
  name = "${var.stack_name}-express-app-role-${var.deployment_id}"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_lambda_function" "backend" {
  function_name = "${var.stack_name}-backend-${var.deployment_id}"
  image_uri     = module.docker_image.image_uri
  role          = aws_iam_role.backend_role.arn
  package_type  = "Image"
  memory_size   = 1024
  timeout       = 30
  architectures = ["arm64"]
  environment {
    variables = {
      APPOINTMENT_TABLE_NAME = module.dynamodb_table.appointments_table.name
      DOCTOR_TABLE_NAME = module.dynamodb_table.doctors_table.name
      USER_TABLE_NAME = module.dynamodb_table.users_table.name
      USER_INDEX_TABLE_NAME = module.dynamodb_table.user_index_table.name
      PATIENTS_TABLE_NAME = module.dynamodb_table.patients_table.name
      WORKING_SCHEDULE_TABLE_NAME = module.dynamodb_table.working_schedule_table.name
      APPOINTMENT_INDEX_TABLE_NAME = module.dynamodb_table.appointment_index_table.name
      DISTRIBUTED_LOCK_TABLE_NAME = module.dynamodb_table.distributed_lock_table.name
      SES_ARN = var.ses_arn
      GOOGLE_CLIENT_ID = var.google_client_id
      GOOGLE_CLIENT_SECRET = var.google_client_secret
      GOOGLE_REDIRECT_URI = "https://www.${var.domain_name}/login/google/callback"
      BEDROCK_AGENT_ID_UNREGISTERED = var.bedrock_agents.unregistered.id
      BEDROCK_AGENT_ALIAS_UNREGISTERED = var.bedrock_agents.unregistered.alias
      BEDROCK_AGENT_ID_REGISTERED = var.bedrock_agents.registered.id
      BEDROCK_AGENT_ALIAS_REGISTERED = var.bedrock_agents.registered.alias
      WEB_BASE_URL = "https://www.${var.domain_name}"
    }
  }
}

resource "aws_iam_role_policy_attachment" "backend_lambda_basic_execution_role_attachment" {
  role       = aws_iam_role.backend_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


#------------------------------------------------#
# API Gateway to expose the Express API          #
#------------------------------------------------#

resource "aws_api_gateway_rest_api" "backend_api" {
  name        = "${var.stack_name}-BackendApi-${var.deployment_id}"
  description = "API Gateway for the Backend API"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.backend_api.id
  parent_id   = aws_api_gateway_rest_api.backend_api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "proxy_integration" {
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

resource "aws_api_gateway_method" "options_proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_proxy_integration" {
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.options_proxy_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = [aws_api_gateway_integration.proxy_integration]
  rest_api_id = aws_api_gateway_rest_api.backend_api.id
  stage_name  = var.api_stage_name
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backend.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.backend_api.execution_arn}/*"
}


resource "aws_api_gateway_domain_name" "backend" {
  certificate_arn = var.certificate_arn
  domain_name     = "api.${var.domain_name}"
}

resource "aws_api_gateway_base_path_mapping" "backend" {
  api_id      = aws_api_gateway_rest_api.backend_api.id
  domain_name = aws_api_gateway_domain_name.backend.domain_name
  stage_name  = "v1"
}

data "aws_iam_policy_document" "allow_access_dynamodb" {
  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    ]

    resources = [
      module.dynamodb_table.appointments_table.arn,
      module.dynamodb_table.doctors_table.arn,
      module.dynamodb_table.users_table.arn,
      module.dynamodb_table.user_index_table.arn,
      module.dynamodb_table.patients_table.arn,
      "${module.dynamodb_table.patients_table.arn}/index/UserIdIndex",
      module.dynamodb_table.working_schedule_table.arn,
      "${module.dynamodb_table.working_schedule_table.arn}/index/DoctorIdAndDateIndex",
      module.dynamodb_table.appointment_index_table.arn,
      module.dynamodb_table.distributed_lock_table.arn
    ]
  }
}

resource "aws_iam_policy" "allow_access_dynamodb" {
  name        = "${var.stack_name}-allow-access-dynamodb-${var.deployment_id}"
  description = "Allow access to DynamoDB tables"
  policy      = data.aws_iam_policy_document.allow_access_dynamodb.json
}

resource "aws_iam_role_policy_attachment" "allow_access_dynamodb" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.allow_access_dynamodb.arn
}

data "aws_iam_policy_document" "allow_access_ses" {
  statement {
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail"
    ]
    resources = [var.ses_arn]
  }
}

resource "aws_iam_policy" "allow_access_ses" {
  name        = "${var.stack_name}-allow-access-ses-${var.deployment_id}"
  description = "Allow access to SES"
  policy      = data.aws_iam_policy_document.allow_access_ses.json
}

resource "aws_iam_role_policy_attachment" "allow_access_ses" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.allow_access_ses.arn
}

data "aws_iam_policy_document" "allow_invoke_bedrock" {
  statement {
    actions = ["bedrock:InvokeAgent"]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "allow_invoke_bedrock" {
  name        = "${var.stack_name}-allow-invoke-bedrock-${var.deployment_id}"
  description = "Allow invoke Bedrock agents"
  policy      = data.aws_iam_policy_document.allow_invoke_bedrock.json
}

resource "aws_iam_role_policy_attachment" "allow_invoke_bedrock" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.allow_invoke_bedrock.arn
}

