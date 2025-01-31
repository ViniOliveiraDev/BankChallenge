// src/domain/entities/Account.ts
export class Account {
    constructor(
        private readonly _number: string,
        private readonly _name: string,
        private _balance: number
    ) {
    }

    // Getters
    get name(): string {
        return this._name;
    }

    get number(): string {
        return this._number;
    }

    get balance(): number {
        return this._balance;
    }

    /**
     * Adds the given amount to the account balance.
     * @param amount The amount to be added to the balance. Must be greater than zero.
     * @throws {Error} If the amount is not greater than zero.
     */
    addBalance(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
        this._balance += amount;
    }

    /**
     * Subtracts the given amount from the account balance.
     *
     * @param amount The amount to be subtracted from the balance. Must be greater than zero.
     * @throws {Error} If the amount is not greater than zero.
     * @throws {Error} If the account balance is insufficient to perform the subtraction.
     */
    subBalance(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
        if (this._balance < amount) {
            throw new Error('Insufficient balance.');
        }
        this._balance -= amount;
    }
}