import mongoose from "mongoose";
import {CreateAccountInput, CreateAccountUC} from "../../src/domains/account/application/use-cases/CreateAccountUC";
import {AccountRepository} from "../../src/domains/account/infrastructure/AccountRepository";
import {AccountModel} from "../../src/domains/account/infrastructure/AccountSchema";

describe("CreateAccountUC", () => {
    let createAccountUC: CreateAccountUC;
    let accountRepository: AccountRepository;

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb");
        accountRepository = new AccountRepository();
        createAccountUC = new CreateAccountUC(accountRepository);
    });

    beforeEach(async () => {
        await AccountModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a new account", async () => {
        const input: CreateAccountInput = {
            number: "12345",
            name: "Vinícius Oliveira",
            balance: 100,
        };

        await createAccountUC.execute(input);

        const savedAccount = await AccountModel.findOne({number: "12345"}).exec();
        expect(savedAccount).not.toBeNull();
        expect(savedAccount?.number).toBe("12345");
        expect(savedAccount?.name).toBe("Vinícius Oliveira");
        expect(savedAccount?.balance).toBe(100);
    });

    it("should throw an error if account number already exists", async () => {
        const input: CreateAccountInput = {
            number: "12345",
            name: "Vinícius Oliveira",
            balance: 100,
        };

        await createAccountUC.execute(input);

        await expect(createAccountUC.execute(input)).rejects.toThrow(
            "Account with this number already exists."
        );
    });

    it("should throw an error if balance is negative", async () => {
        const input: CreateAccountInput = {
            number: "12345",
            name: "Vinícius Oliveira",
            balance: -100,
        };

        await expect(createAccountUC.execute(input)).rejects.toThrow(
            "Balance cannot be negative."
        );
    });
});