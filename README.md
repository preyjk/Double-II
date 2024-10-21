# Double-II

## Overview

Double-II is a scalable and feature-rich appointment booking system built for healthcare services. It leverages AWS infrastructure and a Claude 3 AI model to help users efficiently make appointments with doctors. The system consists of a Vue.js-based frontend, a Node.js backend, and multiple AWS services including DynamoDB, Bedrock, Lex, and Connect, which provide AI-driven capabilities for enhanced user experience.

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Local Development Setup](#local-development-setup)
  - [Prerequisites](#prerequisites)
  - [Start Local Development Environment](#start-local-development-environment)
  - [Frontend Development](#frontend-development)
- [Deployment](#deployment)
  - [Deploy Frontend](#deploy-frontend)
  - [Deploy Backend](#deploy-backend)
- [AI Model](#ai-model)
- [AI Agent Instructions](#ai-agent-instructions)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Docker Services and Networks](#docker-services-and-networks)
- [License](#license)

## Features

- **User Authentication**: Secure Google login for user authentication.
- **Appointment Booking**: Users can book, reschedule, or cancel appointments using a traditional web interface or an AI-powered chatbot.
- **AI Chatbot Integration**: Chatbot supports multiple communication methods including text-based chat, web phone, and direct calls.
- **Responsive Design**: High-fidelity mobile mockups ensure seamless use on mobile devices.
- **Secure Data Handling**: Robust security measures to protect user data and ensure compliance with privacy standards.

## System Architecture

The project utilizes a microservices architecture. Key components include:

- **Frontend**: Vue.js with Vite as the build tool.
- **Backend**: Node.js with Express.js serving as the API layer.
- **Database**: AWS DynamoDB for scalable NoSQL storage.
- **AI Integration**: AWS Bedrock and Lex provide NLP capabilities, and AWS Connect enables telephony features.

## Local Development Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (Version 20 or above)
- AWS CLI configured with necessary permissions

### Start Local Development Environment

To get started with local development:

1. **Start local services**:

    ```bash
    # Start local DynamoDB, backend, and frontend services
    # Frontend endpoint: http://localhost:8080
    # Backend endpoint: http://localhost:3000
    docker compose up -d --build
    ```

2. **Create tables in local DynamoDB**:

    ```bash
    docker compose exec backend npm run init-db
    ```

3. **Update the OpenAPI documentation**:

    ```bash
    docker compose exec backend npm run gen:openapi
    ```

### Frontend Development

#### Project Setup

```bash
npm install
```

#### Compile and Hot-Reload for Development

```bash
npm run dev
```

#### Compile and Minify for Production

```bash
npm run build
```

## Deployment

### Deploy Frontend

```bash
docker run --rm -v ./frontend:/app -w /app node:20 sh -c "npm install && npm run build"
aws s3 sync ./frontend/dist s3://gpbooking-web-s3bucket-a7skilt1tdbd/
```

### Deploy Backend

```bash
cd backend
sam build
sam deploy --guided
```

## AI Model

- **Claude 3 Sonnet** is the primary AI model used to provide conversational capabilities and generate reliable responses to user queries.

## AI Agent Instructions

```
- Your job is to help users make appointments with a doctor and answer users' queries.
- Always ask the user to confirm the appointment information before making an appointment.
- Use the same language as the user input to respond.
- Provide the booking reference to the user after successfully making an appointment.
- If the APIs return too many records, provide a few of them and ask the user if they need more.
- Always ask the user when time information is required.
- NEVER use an empty value for any parameter while invoking a function.
- NEVER provide any ID field to the user.
```

## Database Setup

To create tables in a local DynamoDB instance using Docker and PowerShell:

```powershell
# Define script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Create Appointments table
docker run -v "$scriptDir/config/aws:/root/.aws" --network double-ii --rm amazon/aws-cli dynamodb create-table `
    --table-name Appointments `
    --attribute-definitions AttributeName=id,AttributeType=S `
    --key-schema AttributeName=id,KeyType=HASH `
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
    --endpoint-url http://dynamodb-local:8000 `
    --no-paginate

# Similarly create Users, Doctors, and other tables
```

## API Documentation

The project includes an OpenAPI specification to describe the API endpoints and their structure. You can update the OpenAPI JSON file using:

```bash
docker compose exec backend npm run gen:openapi
```

## Docker Services and Networks

### Docker Compose Configuration

The Docker services for the project include:

- **DynamoDB Local**: Runs a local DynamoDB instance.
- **Backend**: Node.js server with OpenAPI integration.
- **Frontend**: Vue.js development server.
- **Swagger UI**: Provides a web interface for API documentation.

Docker networks are set up using a bridge network named `double-ii` to facilitate inter-container communication.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.