output "appointments_table" {
  value = aws_dynamodb_table.appointments_table
}

output "doctors_table" {
  value = aws_dynamodb_table.doctors_table
}

output "users_table" {
  value = aws_dynamodb_table.users_table
}

output "user_index_table" {
  value = aws_dynamodb_table.user_index_table
}

output "patients_table" {
  value = aws_dynamodb_table.patients_table
}

output "working_schedule_table" {
  value = aws_dynamodb_table.working_schedule_table
}

output "appointment_index_table" {
  value = aws_dynamodb_table.appointment_index_table
}

output "distributed_lock_table" {
  value = aws_dynamodb_table.distributed_lock_table
}
