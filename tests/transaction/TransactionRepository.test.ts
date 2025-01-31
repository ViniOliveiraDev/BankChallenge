import mongoose from "mongoose";
import {Account} from "../../src/domains/account/domain/Account";
import {TransactionModel} from "../../src/domains/transaction/infrastructure/TransactionSchema";
import {TransactionRepository} from "../../src/domains/transaction/infrastructure/TransactionRepository";
import {Transaction} from "../../src/domains/transaction/domain/Transaction";

describe('MongooseTransactionRepository', () => {
    let repository: TransactionRepository;
    let originator: Account;
    let beneficiary: Account;

    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect('mongodb://localhost:27017/testdb');

        // Create indexes manually
        await TransactionModel.createIndexes();

        repository = new TransactionRepository();

        // Create test accounts
        originator = new Account('12345', 'Vinícius Oliveira', 100);
        beneficiary = new Account('67890', 'Pedro Gomes', 50);
    });

    beforeEach(async () => {
        // Clear the Transaction collection before each test
        await TransactionModel.deleteMany({});
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await mongoose.connection.close();
    });

    it('should save a transaction', async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const transactions = await TransactionModel.find({}).exec();
        expect(transactions.length).toBe(1);
        expect(transactions[0].originator.number).toBe('12345');
        expect(transactions[0].beneficiary.number).toBe('67890');
        expect(transactions[0].amount).toBe(30);
    });

    it('should find transactions by originator', async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const foundTransactions = await repository.findByOriginator('12345');
        expect(foundTransactions.length).toBe(1);
        expect(foundTransactions[0].originator.number).toBe('12345');
        expect(foundTransactions[0].beneficiary.number).toBe('67890');
        expect(foundTransactions[0].amount).toBe(30);
    });

    it('should find transactions by beneficiary', async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const foundTransactions = await repository.findByBeneficiary('67890');
        expect(foundTransactions.length).toBe(1);
        expect(foundTransactions[0].originator.number).toBe('12345');
        expect(foundTransactions[0].beneficiary.number).toBe('67890');
        expect(foundTransactions[0].amount).toBe(30);
    });

    it('should delete transactions by originator', async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        await repository.deleteByOriginator('12345');
        const transactions = await TransactionModel.find({}).exec();
        expect(transactions.length).toBe(0);
    });
});