module.exports = {
  transform: {'^.+\\.ts$': 'ts-jest'},
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/examples/**/*',
    '!src/playground/**/*',
    '!src/lz-string.ts',
    '!src/md5.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 38,
      branches: 31,
      functions: 32,
      lines: 45,
    },
  },
}
