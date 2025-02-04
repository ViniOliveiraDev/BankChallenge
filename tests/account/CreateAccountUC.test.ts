import mongoose from "mongoose";
import {CreateAccountUC} from "../../src/domains/account/application/use-cases/CreateAccountUC";
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
        const name = "Vinícius Oliveira"
        const accountDto = await createAccountUC.execute(name);

        const savedAccount = await AccountModel.findOne({number: accountDto.number}).exec();

        expect(savedAccount).not.toBeNull();
        expect(savedAccount?.number).toBe(accountDto.number);
        expect(savedAccount?.name).toBe(name);
        expect(savedAccount?.balance).toBe(0);
    });

    it("should not create an account with existing account number", async () => {
        const name = "Vinícius Oliveira"
        const createdAccount = await createAccountUC.execute(name);
        const savedAccounts = await AccountModel.find({number: createdAccount.number}).exec();
        expect(savedAccounts).not.toBeNull();
        expect(savedAccounts.length).toBe(1);
    });
});