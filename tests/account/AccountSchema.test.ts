import mongoose from 'mongoose';
import {AccountModel} from '../../src/domains/account/infrastructure/schema/AccountSchema';

describe('AccountSchema', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb');
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should have schema fields that match the Account entity attributes', () => {
        // Get the schema paths
        const schemaPaths = Object.keys(AccountModel.schema.paths);

        // expected attributes, as defined in the Account entity
        const expectedAttributes = ['number', 'name', 'balance'];

        expectedAttributes.forEach((attribute) => {
            expect(schemaPaths).toContain(attribute);
        });

        // Verify if the schema contains extra fields that are not part of the entity
        schemaPaths.forEach((path) => {
            if (path !== '_id' && path !== '__v') { // ignore mongoose internal fields
                expect(expectedAttributes).toContain(path);
            }
        });
    });

    it('should create a new account', async () => {
        // Verify that the account was created
        const account = new AccountModel({
            number: '12345',
            name: 'Vinícius Oliveira',
            balance: 100,
        });
        const savedAccount = await account.save();
        expect(savedAccount.number).toBe('12345');
        expect(savedAccount.name).toBe('Vinícius Oliveira');
        expect(savedAccount.balance).toBe(100);
    });
});