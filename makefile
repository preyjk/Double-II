# Define variables for paths and the Docker image
FRONTEND_DIR := $(PWD)/frontend
TERRFORM_BUILD_DIR := $(PWD)/.terraform_build
AI_DIR := $(PWD)/ai
NODE_IMAGE := node:20

.PHONY: clean
clean: 
	@rm -rf $(TERRFORM_BUILD_DIR)

.PHONY: build-frontend
# Target to build the React app using Docker
build-frontend:
	@mkdir -p $(TERRFORM_BUILD_DIR)
	@docker run --rm -v $(FRONTEND_DIR):/app -w /app $(NODE_IMAGE) sh -c "npm install && npm run build" && \
	find $(FRONTEND_DIR)/dist -type f | sort | xargs sha256sum | awk '{print $$1}' | sha256sum > $(TERRFORM_BUILD_DIR)/frontend.sha256sum

.PHONY: build-ai
build-ai:
	@mkdir -p ${TERRFORM_BUILD_DIR}/ai
	@cp -r ${AI_DIR}/src/* ${TERRFORM_BUILD_DIR}/ai && \
	cd ${TERRFORM_BUILD_DIR}/ai && \
	docker run --platform linux/arm64 --rm -v .:/var/task public.ecr.aws/sam/build-python3.12 pip install -r requirements.txt -t . && \
	zip -q -X -r ${TERRFORM_BUILD_DIR}/ai_package.zip . 
	@find ${TERRFORM_BUILD_DIR}/ai -type f ! -name '*.pyc' | sort | xargs sha256sum | awk '{print $$1}' | sha256sum > ${TERRFORM_BUILD_DIR}/ai_package.sha256sum

.PHONY: build
build: clean build-frontend build-ai

.PHONY: deploy
deploy: build
	@cd terraform && terraform init && terraform apply -auto-approve -var-file="credentials.tfvars"