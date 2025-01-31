import dotenv from 'dotenv';
// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

describe('Environment Variables', () => {
    it('should load the MONGO_URI variable from .env', () => {
        // Verificar se a variável MONGO_URI foi carregada corretamente
        expect(process.env.MONGO_URI).toBeDefined();
        expect(typeof process.env.MONGO_URI).toBe('string');
        expect(process.env.MONGO_URI?.length).toBeGreaterThan(0);
    });
});