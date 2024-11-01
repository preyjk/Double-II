provider "aws" {
  default_tags {
    tags = {
      "Terraform"       = "true"
      "Terraform_stack" = var.stack_name
      "Environment"     = var.environment
    }
  }
}

data "local_file" "frontend_hash" {
  filename = "${path.module}/../.terraform_build/frontend.sha256sum"
}

data "local_file" "ai_package_hash" {
  filename = "${path.module}/../.terraform_build/ai_package.sha256sum"
}

resource "random_string" "deployment_id" {
  length  = 10
  special = false
  upper   = false
}

module "certificate" {
  source = "./certificate"

  domain_name     = var.domain_name
  route53_zone_id = var.route53_zone_id
}

module "frontend" {
  source = "./frontend"

  stack_name                 = var.stack_name
  domain_name                = var.domain_name
  cloudfront_certificate_arn = module.certificate.certificate_arn
  s3_bucket_suffix           = random_string.deployment_id.result
  source_code_hash           = data.local_file.frontend_hash.content
  build_target_path          = "${path.module}/../frontend/dist"
}

module "ai" {
  source = "./ai"

  stack_name   = var.stack_name
  agent_suffix = random_string.deployment_id.result

  package_path                 = "${path.module}/../.terraform_build/ai_package.zip"
  source_code_hash             = data.local_file.ai_package_hash.content
  registered_user_api_schema   = "${path.module}/../ai/register-user-api.json"
  unregistered_user_api_schema = "${path.module}/../ai/unregistered-user-api.json"

  environment = var.environment
}

module "backend" {
  source = "./backend"

  stack_name    = var.stack_name
  deployment_id = random_string.deployment_id.result
  source_path   = "${path.module}/../backend/app"
  ses_arn       = var.ses_arn
  certificate_arn = module.certificate.certificate_arn

  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  domain_name    = var.domain_name
  api_stage_name = "v1"
  bedrock_agents = {
    unregistered = {
      id    = module.ai.unregistered_agent_id
      alias = module.ai.unregistered_agent_alias_id
    }
    registered = {
      id    = module.ai.registered_agent_id
      alias = module.ai.registered_agent_alias_id
    }
  }
}

resource "aws_route53_record" "frontend" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = module.frontend.frontend_distribution.domain_name
    zone_id                = module.frontend.frontend_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_frontend" {
  zone_id = var.route53_zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  alias {
    name                   = module.frontend.frontend_distribution.domain_name
    zone_id                = module.frontend.frontend_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}



resource "aws_route53_record" "backend_api" {
  name    = "api.${var.domain_name}"
  type    = "A"
  zone_id = var.route53_zone_id

  alias {
    evaluate_target_health = true
    name                   = module.backend.backend_domain.cloudfront_domain_name
    zone_id                = module.backend.backend_domain.cloudfront_zone_id
  }
}

