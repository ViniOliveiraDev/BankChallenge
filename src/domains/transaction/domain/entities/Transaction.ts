import {Account} from "../../../account/domain/Account";

export class Transaction {
    constructor(
        private readonly _originator: Account,
        private readonly _beneficiary: Account,
        private readonly _amount: number
    ) {
    }

    // Getters
    get originator(): Account {
        return this._originator;
    }

    get beneficiary(): Account {
        return this._beneficiary;
    }

    get amount(): number {
        return this._amount;
    }

    /**
     * Verifies if the transaction is valid.
     *
     * A transaction is valid if:
     * 1. The originator and the beneficiary are different accounts.
     * 2. The amount is greater than zero (positive).
     * 3. The originator has enough balance to perform the transaction.
     *
     * @returns {boolean} `true` if the transaction is valid, `false` otherwise.
     */
    isValid(): boolean {
        return (
            this._originator !== this._beneficiary && // can't transfer to yourself
            this._amount > 0 && // The amount must be greater than zero (positive)
            this._originator.balance >= this._amount // insufficient balance
        );
    }

    /**
     * Processes the transaction between the originator and the beneficiary.
     *
     * This method verifies the validity of the transaction by checking if the transaction is valid.
     * If the transaction is invalid, an error is thrown.
     * If valid, it subtracts the transaction amount from the originator's balance and adds it to the beneficiary's balance.
     *
     * @throws {Error} If the transaction is invalid.
     */
    process(): void {
        if (!this.isValid()) {
            throw new Error('Invalid transaction.');
        }
        this._originator.subBalance(this._amount);
        this._beneficiary.addBalance(this._amount);
    }
}