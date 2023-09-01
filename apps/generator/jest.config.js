module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    setupFilesAfterEnv: ['./test/setup.ts'],
};
