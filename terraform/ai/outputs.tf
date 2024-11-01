output "unregistered_agent_id" {
  value = aws_bedrockagent_agent.bedrock_agent_unregistered_user.id
}

output "unregistered_agent_alias_id" {
  value = aws_bedrockagent_agent_alias.bedrock_agent_alias_1.agent_alias_id
}

output "registered_agent_id" {
  value = aws_bedrockagent_agent.bedrock_agent_registered_user.id
}

output "registered_agent_alias_id" {
  value = aws_bedrockagent_agent_alias.bedrock_agent_alias_2.agent_alias_id
}