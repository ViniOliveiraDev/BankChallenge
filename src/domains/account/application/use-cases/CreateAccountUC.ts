import {IAccountRepository} from "../../domain/IAccountRepository";
import {Account} from "../../domain/Account";
import {IAccountDTO} from "../../infrastructure/IAccountDTO";
import {AccountMapper} from "../../infrastructure/AccountMapper";

export class CreateAccountUC {

    constructor(private accountRepository: IAccountRepository) {
    }

    async execute(name: string): Promise<IAccountDTO> {
        const account = await this.validateAccountNumber(name);
        await this.accountRepository.save(account);
        return AccountMapper.toDTO(account);
    }

    private async validateAccountNumber(name: string): Promise<Account> {
        // verify if the account's number exists, and try to generate a new one if it doesn't 'till it success
        let done = false;
        let finalAccount: Account = new Account(name);
        while (!done) {
            const existingAccount = await this.accountRepository.findByNumber(finalAccount.number);
            finalAccount = new Account(name);
            if (!existingAccount) {
                done = true;
            }
        }
        return finalAccount;
    }
}