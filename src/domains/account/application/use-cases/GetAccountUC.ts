import {IAccountRepository} from "../../domain/IAccountRepository";
import {Schema} from "mongoose";
import {IAccountDTO} from "../../infrastructure/IAccountDTO";

export class GetAccountUC {

    constructor(private accountRepository: IAccountRepository) {
    }

    async execute(number: string): Promise<IAccountDTO> {
        const account = await this.accountRepository.findByNumber(number);

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
