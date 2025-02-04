module.exports = {
    preset: 'ts-jest', // typescript preset
    testTimeout: 60000, // 1 minute Tests Timeout
    testEnvironment: 'node', // test environment as node
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
};