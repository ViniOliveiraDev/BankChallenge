import mongoose from "mongoose";
import {GetAccountUC} from "../../src/domains/account/application/use-cases/GetAccountUC";
import {AccountModel} from "../../src/domains/account/infrastructure/AccountSchema";
import {AccountRepository} from "../../src/domains/account/infrastructure/AccountRepository";

describe("GetAccountUC", () => {
    let getAccountUC: GetAccountUC;
    let accountRepository: AccountRepository;

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb");

        accountRepository = new AccountRepository();
        getAccountUC = new GetAccountUC(accountRepository);
    });

    beforeEach(async () => {
        await AccountModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should get an account by number", async () => {
        // Create a test account
        const account = new AccountModel({
            number: "12345",
            name: "Vinícius Oliveira",
            balance: 100,
        });

        await account.save();

        const output = await getAccountUC.execute("12345");

        expect(output.number).toBe("12345");
        expect(output.name).toBe("Vinícius Oliveira");
        expect(output.balance).toBe(100);
    });

    it("should throw an error if account is not found", async () => {
        await expect(getAccountUC.execute("12345")).rejects.toThrow(
            "Account not found."
        );
    });
});