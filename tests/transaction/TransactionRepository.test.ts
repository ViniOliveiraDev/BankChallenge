import {TransactionModel} from "../../src/domains/transaction/infrastructure/TransactionSchema";
import {TransactionRepository} from "../../src/domains/transaction/infrastructure/TransactionRepository";
import {Account} from "../../src/domains/account/domain/Account";
import mongoose, {Schema} from "mongoose";
import {AccountModel} from "../../src/domains/account/infrastructure/AccountSchema";
import {Transaction} from "../../src/domains/transaction/domain/Transaction";

describe("TransactionRepository", () => {
    let repository: TransactionRepository;
    let originator: Account;
    let beneficiary: Account;

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb");
        await AccountModel.deleteMany({}); // clear account collection

        await TransactionModel.createIndexes();

        repository = new TransactionRepository();

        const originatorDoc = new AccountModel({
            number: "12345",
            name: "John Doe",
            balance: 100,
        });

        const beneficiaryDoc = new AccountModel({
            number: "67890",
            name: "Jane Doe",
            balance: 50,
        });

        await originatorDoc.save();
        await beneficiaryDoc.save();

        originator = new Account(originatorDoc.number, originatorDoc.name, originatorDoc.balance);
        originator.id = originatorDoc._id as Schema.Types.ObjectId;
        beneficiary = new Account(beneficiaryDoc.number, beneficiaryDoc.name, beneficiaryDoc.balance);
        beneficiary.id = beneficiaryDoc._id as Schema.Types.ObjectId;
    });

    beforeEach(async () => {
        await TransactionModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.db?.dropDatabase();
        await mongoose.connection.close();
    });

    it("should save a transaction", async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const transactions = await TransactionModel.find({})
            .populate("originator")
            .populate("beneficiary")
            .exec();
        expect(transactions.length).toBe(1);

        // @ts-ignore
        expect(transactions[0].originator.number).toBe("12345");
        // @ts-ignore
        expect(transactions[0].beneficiary.number).toBe("67890");
        expect(transactions[0].amount).toBe(30);
    });

    it("should find transactions by originator", async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const foundTransactions = await repository.findByOriginator("12345");
        expect(foundTransactions.length).toBe(1);
        expect(foundTransactions[0].originator.number).toBe("12345");
        expect(foundTransactions[0].beneficiary.number).toBe("67890");
        expect(foundTransactions[0].amount).toBe(30);
    });

    it("should find transactions by beneficiary", async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        const foundTransactions = await repository.findByBeneficiary("67890");
        expect(foundTransactions.length).toBe(1);
        
        expect(foundTransactions[0].originator.number).toBe("12345");
        expect(foundTransactions[0].beneficiary.number).toBe("67890");
        expect(foundTransactions[0].amount).toBe(30);
    });

    it("should delete transactions by originator", async () => {
        const transaction = new Transaction(originator, beneficiary, 30);
        await repository.save(transaction);

        await repository.deleteByOriginator("12345");
        const transactions = await TransactionModel.find({}).exec();
        expect(transactions.length).toBe(0);
    });
});