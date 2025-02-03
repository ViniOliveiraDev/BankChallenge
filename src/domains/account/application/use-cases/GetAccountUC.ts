import {IAccountRepository} from "../../domain/IAccountRepository";
import {Schema} from "mongoose";

export interface GetAccountInput {
    number: string;
}

export interface GetAccountOutput {
    id: Schema.Types.ObjectId;
    number: string;
    name: string;
    balance: number;
}


export class GetAccountUC {
    constructor(private accountRepository: IAccountRepository) {
    }

    async execute(input: GetAccountInput): Promise<GetAccountOutput> {
        if (!input.number) {
            throw new Error("Account number is required.");
        }

        const account = await this.accountRepository.findByNumber(input.number);

        if (!account) {
            throw new Error("Account not found.");
        }

        return {
            id: account.id as Schema.Types.ObjectId,
            number: account.number,
            name: account.name,
            balance: account.balance,
        };
    }
}
