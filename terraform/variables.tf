variable "domain_name" {
  type    = string
  default = "gpbooking.icu"
}

variable "route53_zone_id" {
  type    = string
}

variable "stack_name" {
  type    = string
  default = "gpbooking"
}

variable "ses_arn" {
  type    = string
}

variable "google_client_id" {
  type    = string
  sensitive = true
}

variable "google_client_secret" {
  type    = string
  sensitive = true
}

variable "environment" {
  type    = string
  default = "production"
}