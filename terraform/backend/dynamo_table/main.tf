resource "aws_dynamodb_table" "appointments_table" {
  name           = "${var.stack_name}-appointments-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "users_table" {
  name           = "${var.stack_name}-users-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "working_schedule_table" {
  name           = "${var.stack_name}-working-schedule-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
  attribute {
    name = "DoctorId"
    type = "S"
  }
  attribute {
    name = "Date"
    type = "S"
  }

  global_secondary_index {
    name               = "DoctorIdAndDateIndex"
    hash_key           = "DoctorId"
    range_key          = "Date"
    projection_type    = "ALL"
  }
}

resource "aws_dynamodb_table" "doctors_table" {
  name           = "${var.stack_name}-doctors-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "patients_table" {
  name           = "${var.stack_name}-patients-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
  attribute {
    name = "UserId"
    type = "S"
  }

  global_secondary_index {
    name               = "UserIdIndex"
    hash_key           = "UserId"
    projection_type    = "ALL"
  }
}

resource "aws_dynamodb_table" "user_index_table" {
  name           = "${var.stack_name}-user-index-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "appointment_index_table" {
  name           = "${var.stack_name}-appointment-index-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "distributed_lock_table" {
  name           = "${var.stack_name}-distributed-lock-${var.table_suffix}"
  billing_mode   = "PAY_PER_REQUEST"
  on_demand_throughput {
    max_read_request_units = 5
    max_write_request_units = 5
  }
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
  ttl {
    attribute_name = "ExpiredAt"
    enabled = true
  }
}