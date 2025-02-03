import {IAccountRepository} from "../../domain/IAccountRepository";
import {Account} from "../../domain/Account";

export interface CreateAccountInput {
    number: string;
    name: string;
    balance: number;
}

export class CreateAccountUC {
    constructor(private accountRepository: IAccountRepository) {
    }

    async execute(input: CreateAccountInput): Promise<void> {
        if (!input.number || !input.name || input.balance === undefined) {
            throw new Error("All fields are required.");
        }

        if (input.balance < 0) {
            throw new Error("Balance cannot be negative.");
        }

        const existingAccount = await this.accountRepository.findByNumber(input.number);
        if (existingAccount) {
            throw new Error("Account with this number already exists.");
        }

        const account = new Account(input.number, input.name, input.balance);

        await this.accountRepository.save(account);
    }
}