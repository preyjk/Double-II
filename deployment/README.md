# Deployment Commands

## Deploy Frontend
```bash
docker run --rm -v ./frontend:/app -w /app node:20 sh -c "npm install && npm run build"

aws s3 sync ./frontend/dist s3://gpbooking-web-s3bucket-a7skilt1tdbd/
```

## Deploy Backend
```bash
docker run --rm -v ./backend:/app -w /app public.ecr.aws/sam/build-nodejs18.x sam build

sam deploy --template-file backend/.aws-sam/build/template.yaml --stack-name double-ii --capabilities CAPABILITY_IAM --parameter-overrides EnvName=PROD --resolve-s3 
```

