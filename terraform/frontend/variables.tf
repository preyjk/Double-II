variable "stack_name" {
  type        = string
}

variable "domain_name" {
  type        = string
}

variable "cloudfront_certificate_arn" {
  type        = string
}

variable "s3_bucket_suffix" {
  type        = string
}

variable "source_code_hash" {
  type        = string
}

variable "build_target_path" {
  type        = string
}