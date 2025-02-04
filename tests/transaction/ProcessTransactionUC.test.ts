import mongoose from "mongoose";
import {
    ProcessTransactionInput,
    ProcessTransactionUC
} from "../../src/domains/transaction/application/use-cases/ProcessTransactionUC";
import {AccountRepository} from "../../src/domains/account/infrastructure/AccountRepository";
import {TransactionRepository} from "../../src/domains/transaction/infrastructure/TransactionRepository";
import {AccountModel} from "../../src/domains/account/infrastructure/AccountSchema";
import {TransactionModel} from "../../src/domains/transaction/infrastructure/TransactionSchema";

describe("ProcessTransactionUC", () => {
    let processTransactionUC: ProcessTransactionUC;
    let accountRepository: AccountRepository;
    let transactionRepository: TransactionRepository;

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb");

        accountRepository = new AccountRepository();
        transactionRepository = new TransactionRepository();
        processTransactionUC = new ProcessTransactionUC(accountRepository, transactionRepository);
    });

    beforeEach(async () => {
        await AccountModel.deleteMany({});
        await TransactionModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should process a valid transaction", async () => {
        // Create test accounts
        const originator = new AccountModel({
            number: "12345",
            name: "John Doe",
            balance: 100,
        });

        const beneficiary = new AccountModel({
            number: "67890",
            name: "Jane Doe",
            balance: 50,
        });

        await originator.save();
        await beneficiary.save();

        // Process transaction
        const input: ProcessTransactionInput = {
            originatorNumber: "12345",
            beneficiaryNumber: "67890",
            amount: 30,
        };

        await processTransactionUC.execute(input);

        // Verify account balances
        const updatedOriginator = await AccountModel.findOne({number: "12345"}).exec();
        const updatedBeneficiary = await AccountModel.findOne({number: "67890"}).exec();

        expect(updatedOriginator?.balance).toBe(70); // 100 - 30
        expect(updatedBeneficiary?.balance).toBe(80); // 50 + 30

        // Verify transaction was saved
        const transactions = await TransactionModel.find({}).exec();
        expect(transactions.length).toBe(1);
        expect(transactions[0].amount).toBe(30);
    });

    it("should throw an error if originator or beneficiary account is not found", async () => {
        const input: ProcessTransactionInput = {
            originatorNumber: "12345",
            beneficiaryNumber: "67890",
            amount: 30,
        };

        await expect(processTransactionUC.execute(input)).rejects.toThrow(
            "Originator or beneficiary account not found."
        );
    });

    it("should throw an error if amount is invalid", async () => {
        // Create test accounts
        const originator = new AccountModel({
            number: "12345",
            name: "John Doe",
            balance: 100,
        });

        const beneficiary = new AccountModel({
            number: "67890",
            name: "Jane Doe",
            balance: 50,
        });

        await originator.save();
        await beneficiary.save();

        // Test invalid amount
        const input: ProcessTransactionInput = {
            originatorNumber: "12345",
            beneficiaryNumber: "67890",
            amount: -30,
        };

        await expect(processTransactionUC.execute(input)).rejects.toThrow(
            "Amount must be greater than zero."
        );
    });

    it("should throw an error if originator has insufficient balance", async () => {
        // Create test accounts
        const originator = new AccountModel({
            number: "12345",
            name: "John Doe",
            balance: 20,
        });

        const beneficiary = new AccountModel({
            number: "67890",
            name: "Jane Doe",
            balance: 50,
        });

        await originator.save();
        await beneficiary.save();

        // Test insufficient balance
        const input: ProcessTransactionInput = {
            originatorNumber: "12345",
            beneficiaryNumber: "67890",
            amount: 30,
        };

        await expect(processTransactionUC.execute(input)).rejects.toThrow(
            "Invalid transaction."
        );
    });
});