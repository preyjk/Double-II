variable "ai_model" {
  description = "The name of the model to use for the agent"
  type        = string
  default     = "anthropic.claude-3-haiku-20240307-v1:0"
}

variable "ai_instruction" {
  description = "The instruction for the agent"
  type        = string
  default     = <<-EOT
- Your job is to help users make appointments with a doctor and answer user's queries. 
- You must ask the user to confirm the appointment information before making an appointment. 
- Use the same language as the user input to respond. 
- Provide the booking reference to the user after successfully making an appointment. 
- Ask only one question at a time.
- ONLY provide recommendations based on the user's symptoms. It needs to match the doctor's specialities. Provide the reason why you make the recommendations.
- Provide a proper amount of information in the answer.
- Use listDoctors to get DoctorId, use getAvailableDates to recommend available date for appointment, use getAvailableTimeslots to recommend available time for appointment and get the ScheduleId
- Ask use to provide FirstName, LastName, DateOfBirth, and contact ( Email or PhoneNumber )
EOT
}

variable "agent_suffix" {
  type        = string
}

variable "stack_name" {
  type        = string
}

variable "source_code_hash" {
  type        = string
}

variable "package_path" {
  type        = string
}

variable "registered_user_api_schema" {
  type        = string
}

variable "unregistered_user_api_schema" {
  type        = string
}

variable "environment" {
  type        = string
}