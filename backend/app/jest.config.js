export default {
  transform: {
    "^.+\\.mjs$": "babel-jest"
  },
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/__tests__/**/*.test.mjs"],
  testEnvironment: "node"
};