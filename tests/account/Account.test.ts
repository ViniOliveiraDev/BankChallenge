import {Account} from "../../src/domains/account/domain/Account";

describe('Account', () => {
    it('should create an account with the correct properties', () => {
        const account = new Account('Vinícius Oliveira', 100);
        expect(account.name).toBe('Vinícius Oliveira');
        expect(account.number).toBeDefined();
        expect(account.number).toHaveLength(8);
        expect(account.balance).toBe(100);
    });

    it('should create Account with the given number', () => {
        const account = new Account('Vinícius Oliveira', 100, "12345");
        expect(account.number).toBe("12345");
    });

    it('should add balance correctly', () => {
        const account = new Account('Vinícius Oliveira', 100);
        account.addBalance(50);
        expect(account.balance).toBe(150);
    });

    it('should throw an error when adding a negative amount', () => {
        const account = new Account('Vinícius Oliveira', 100);
        expect(() => account.addBalance(-10)).toThrow('Amount must be greater than zero.');
    });

    it('should subtract balance correctly', () => {
        const account = new Account('Vinícius Oliveira', 100);
        account.subBalance(50);
        expect(account.balance).toBe(50);
    });

    it('should throw an error when subtracting more than the balance', () => {
        const account = new Account('Vinícius Oliveira', 100);
        expect(() => account.subBalance(150)).toThrow('Insufficient balance.');
    });
});