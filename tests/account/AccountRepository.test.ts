import {AccountRepository} from "../../src/domains/account/infrastructure/AccountRepository";
import mongoose from "mongoose";
import {AccountModel} from "../../src/domains/account/infrastructure/AccountSchema";
import {Account} from "../../src/domains/account/domain/Account";

describe('AccountRepository', () => {
    let repository: AccountRepository;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb');
        await AccountModel.createIndexes();

        repository = new AccountRepository();
    });

    beforeEach(async () => {
        // clear account collection to avoid duplicated "number" key exception
        await AccountModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection?.db?.dropDatabase();
        await mongoose.connection.close();
    });

    it('should save and find an account by number', async () => {
        const account = new Account('12345', 'Vinícius Oliveira', 100);
        await repository.save(account);

        const foundAccount = await repository.findByNumber('12345');
        expect(foundAccount).not.toBeNull();
        expect(foundAccount?.number).toBe('12345');
        expect(foundAccount?.name).toBe('Vinícius Oliveira');
        expect(foundAccount?.balance).toBe(100);
    });

    it('should update an account', async () => {
        const account = new Account('12345', 'Vinícius Oliveira', 100);
        await repository.save(account);

        account.addBalance(100);
        await repository.update(account);

        const updatedAccount = await repository.findByNumber('12345');
        expect(updatedAccount?.balance).toBe(200);
    });

    it('should delete an account', async () => {
        const account = new Account('12345', 'Vinícius Oliveira', 100);
        await repository.save(account);

        await repository.delete('12345');
        const deletedAccount = await repository.findByNumber('12345');
        expect(deletedAccount).toBeNull();
    });
});