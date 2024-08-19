const axios = require("axios");

console.log(process.env);

module.exports = function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    timeout: 5000,
  });
  return instance(config);
};
