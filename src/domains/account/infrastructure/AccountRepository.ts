import {Account} from "../domain/Account";
import {AccountModel} from "./AccountSchema";
import {AccountMapper} from "./AccountMapper";
import {IAccountDTO} from "./IAccountDTO";
import {Schema} from "mongoose";

export class AccountRepository implements AccountRepository {
    async findByNumber(number: string): Promise<Account | null> {
        const accountDoc = await AccountModel.findOne({number}).exec();
        if (!accountDoc) return null;

        const accountDTO: IAccountDTO = {
            id: accountDoc._id as Schema.Types.ObjectId,
            number: accountDoc.number,
            name: accountDoc.name,
            balance: accountDoc.balance,
        };

        return AccountMapper.toDomain(accountDTO);
    }

    async save(account: Account): Promise<void> {
        const accountDTO = AccountMapper.toDTO(account);
        const accountDoc = new AccountModel(accountDTO);
        await accountDoc.save();
    }

    async update(account: Account): Promise<void> {
        const accountDTO = AccountMapper.toDTO(account);
        await AccountModel.updateOne(
            {number: accountDTO.number},
            {$set: {name: accountDTO.name, balance: accountDTO.balance}}
        ).exec();
    }

    async delete(number: string): Promise<void> {
        await AccountModel.deleteOne({number}).exec();
    }
}