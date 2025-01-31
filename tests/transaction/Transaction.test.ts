import {Account} from "../../src/domains/account/domain/Account";
import {Transaction} from "../../src/domains/transaction/domain/Transaction";

describe('Transaction', () => {
    const originator = new Account('12345', 'John Doe', 100);
    const beneficiary = new Account('67890', 'Jane Doe', 50);

    it('should create a transaction with the correct properties', () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        expect(transaction.originator).toBe(originator);
        expect(transaction.beneficiary).toBe(beneficiary);
        expect(transaction.amount).toBe(30);
    });

    it('should validate a transaction correctly', () => {
        const validTransaction = new Transaction(originator, beneficiary, 30);
        expect(validTransaction.isValid()).toBe(true);

        const invalidTransaction = new Transaction(originator, originator, 30);
        expect(invalidTransaction.isValid()).toBe(false);
    });

    it('should process a valid transaction', () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        transaction.process();
        expect(originator.balance).toBe(70);
        expect(beneficiary.balance).toBe(80);
    });

    it('should throw an error when processing an invalid transaction', () => {
        const invalidTransaction = new Transaction(originator, originator, 30);
        expect(() => invalidTransaction.process()).toThrow('Invalid transaction.');
    });
});