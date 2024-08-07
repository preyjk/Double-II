const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "https://kifzcpfox4.execute-api.us-east-1.amazonaws.com/v1/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
});
