build-NodeDepLayer:
	cp ./package.json $(ARTIFACTS_DIR)/package.json
	cd $(ARTIFACTS_DIR) && npm install --production

%:
	# Use rsync to copy source files to the $(ARTIFACTS_DIR), excluding the tests directory
	rsync -av --delete --exclude '__tests__/' ./src $(ARTIFACTS_DIR)/
	