export default {
  transformIgnorePatterns: ['/node_modules/(?!(nanoid)/)'],
  transform: {
    '^.+\\.(t|j)sx?$': ['babel-jest'],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/dal/**",
    "./src/service/**",
    "./src/controller/**",
  ],
  coverageReporters: ["text"],
};
