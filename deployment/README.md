# Deployment Commands

## Deploy Frontend
```bash
docker run --rm -v ./frontend:/app -w /app node:20 sh -c "npm install && npm run build"

aws s3 sync ./frontend/dist s3://gpbooking-web-s3bucket-a7skilt1tdbd/
```

## Deploy Backend
```bash
cd backend
sam build
sam deploy --guided
```

