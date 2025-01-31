import {Transaction} from "../domain/Transaction";
import {TransactionMapper} from "./TransactionMapper";
import {TransactionModel} from "./TransactionSchema";
import {ITransactionRepository} from "../domain/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
    async save(transaction: Transaction): Promise<void> {
        const transactionDTO = TransactionMapper.toDTO(transaction);
        const transactionDoc = new TransactionModel(transactionDTO);
        await transactionDoc.save();
    }

    async findByOriginator(originatorNumber: string): Promise<Transaction[]> {
        const transactionDocs = await TransactionModel.find({'originator.number': originatorNumber}).exec();
        return transactionDocs.map((doc) => TransactionMapper.toDomain({
            originator: doc.originator,
            beneficiary: doc.beneficiary,
            amount: doc.amount,
        }));
    }

    async findByBeneficiary(beneficiaryNumber: string): Promise<Transaction[]> {
        const transactionDocs = await TransactionModel.find({'beneficiary.number': beneficiaryNumber}).exec();
        return transactionDocs.map((doc) => TransactionMapper.toDomain({
            originator: doc.originator,
            beneficiary: doc.beneficiary,
            amount: doc.amount,
        }));
    }

    async deleteByOriginator(originatorNumber: string): Promise<void> {
        await TransactionModel.deleteMany({'originator.number': originatorNumber}).exec();
    }
}