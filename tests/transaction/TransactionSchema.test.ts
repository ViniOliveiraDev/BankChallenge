import {AccountModel, IAccountDocument} from "../../src/domains/account/infrastructure/AccountSchema";
import mongoose from "mongoose";
import {TransactionModel} from "../../src/domains/transaction/infrastructure/TransactionSchema";

describe('TransactionSchema', () => {
    let originator: IAccountDocument;
    let beneficiary: IAccountDocument;

    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect('mongodb://localhost:27017/testdb');

        // Create test accounts
        originator = new AccountModel({
            number: '12345',
            name: 'John Doe',
            balance: 100,
        });

        beneficiary = new AccountModel({
            number: '67890',
            name: 'Jane Doe',
            balance: 50,
        });

        await originator.save();
        await beneficiary.save();
    });

    beforeEach(async () => {
        // Clear the Transaction collection before each test
        await TransactionModel.deleteMany({});
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await mongoose.connection.db?.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new transaction', async () => {
        const transaction = new TransactionModel({
            originator: originator._id,
            beneficiary: beneficiary._id,
            amount: 30,
        });

        const savedTransaction = await transaction.save();
        // @ts-ignore
        expect(savedTransaction.originator.toString()).toBe(originator._id.toString());
        // @ts-ignore
        expect(savedTransaction.beneficiary.toString()).toBe(beneficiary._id.toString());
        expect(savedTransaction.amount).toBe(30);
    });

    it('should require the originator field', async () => {
        const transaction = new TransactionModel({
            beneficiary: beneficiary._id,
            amount: 30,
        });

        await expect(transaction.save()).rejects.toThrow(
            /originator/
        );
    });

    it('should require the beneficiary field', async () => {
        const transaction = new TransactionModel({
            originator: originator._id,
            amount: 30,
        });

        await expect(transaction.save()).rejects.toThrow(
            /beneficiary/
        );
    });

    it('should require the amount field', async () => {
        const transaction = new TransactionModel({
            originator: originator._id,
            beneficiary: beneficiary._id,
        });

        await expect(transaction.save()).rejects.toThrow(
            /amount/
        );
    });
});