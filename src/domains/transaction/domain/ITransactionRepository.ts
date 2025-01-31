import {Transaction} from "./Transaction";

export interface ITransactionRepository {
    /**
     * Saves a transaction to the database.
     * @param transaction - The transaction to be saved.
     */
    save(transaction: Transaction): Promise<void>;

    /**
     * Finds transactions by the originator's account number.
     * @param originatorNumber - The originator's account number.
     * @returns A list of transactions found.
     */
    findByOriginator(originatorNumber: string): Promise<Transaction[]>;

    /**
     * Finds transactions by the beneficiary's account number.
     * @param beneficiaryNumber - The beneficiary's account number.
     * @returns A list of transactions found.
     */
    findByBeneficiary(beneficiaryNumber: string): Promise<Transaction[]>;

    /**
     * Deletes all transactions associated with the originator's account number.
     * @param originatorNumber - The originator's account number.
     */
    deleteByOriginator(originatorNumber: string): Promise<void>;
}