import {Account} from "../domain/Account";
import {IAccountDTO} from "./IAccountDTO";

export class AccountMapper {
    static toDTO(account: Account): IAccountDTO {
        return {
            id: account.id,
            number: account.number,
            name: account.name,
            balance: account.balance,
        };
    }

    /**
     * Converts an IAccountDTO object into an Account object.
     * @param {IAccountDTO} accountDTO The IAccountDTO object to convert.
     * @returns {Account} The Account object converted from the IAccountDTO object.
     */
    static toDomain(accountDTO: IAccountDTO): Account {
        let account = new Account(accountDTO.number, accountDTO.name, accountDTO.balance);
        if (accountDTO.id) account.id = accountDTO.id;
        return account;
    }
}