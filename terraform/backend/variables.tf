variable "stack_name" {
  type        = string
}

variable "source_path" {
  type        = string
}

variable "deployment_id" {
  type        = string
}

variable "ses_arn" {
  type        = string
}

variable "google_client_id" {
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  type        = string
  sensitive   = true
}

variable "api_stage_name" {
  type        = string
  default     = "v1"
}

variable "bedrock_agents" {
  type        = map(object({
    id    = string
    alias = string
  }))
}

variable "domain_name" {
  type        = string
}

variable "certificate_arn" {
  type        = string
}