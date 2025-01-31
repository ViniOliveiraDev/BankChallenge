import {Account} from "./Account";

export interface IAccountRepository {
    findByNumber(number: string): Promise<Account | null>;

    save(account: Account): Promise<void>;

    update(account: Account): Promise<void>;

    delete(number: string): Promise<void>;
}