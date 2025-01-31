import {Account} from "../../domain/Account";

export interface IAccountRepository {
    findByNumber(number: string): Promise<Account | null>;

    save(account: Account): Promise<void>;
}