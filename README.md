# Double-II

## Start Local Development Environment
```bash
# use this command to start a local dynamodb, a backend and a frontend services
# frontend endpoint: http://localhost:8080
# backend endpoint: http://localhost:3000
docker compose up -d --build

# use this command to create tables in local dynamodb
docker compose exec backend npm run init-db
```