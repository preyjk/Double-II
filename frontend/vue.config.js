const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "https://api.gpbooking.icu/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
});
