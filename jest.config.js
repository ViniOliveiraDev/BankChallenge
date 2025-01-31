module.exports = {
    preset: 'ts-jest', // Usar o preset ts-jest para TypeScript
    testEnvironment: 'node', // Ambiente de teste (Node.js)
    testMatch: ['**/*.test.ts'], // Padrão para encontrar arquivos de teste
    transform: {
        '^.+\\.ts$': 'ts-jest', // Transformar arquivos TypeScript
    },
    moduleFileExtensions: ['ts', 'js', 'json'], // Extensões de arquivo suportadas
};