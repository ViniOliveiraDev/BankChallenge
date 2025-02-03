import {ITransactionRepository} from "../domain/ITransactionRepository";
import {Transaction} from "../domain/Transaction";
import {TransactionMapper} from "./TransactionMapper";
import {TransactionModel} from "./TransactionSchema";
import {AccountModel, IAccountDocument} from "../../account/infrastructure/AccountSchema";

export class TransactionRepository implements ITransactionRepository {
    async save(transaction: Transaction): Promise<void> {
        const transactionDTO = TransactionMapper.toDTO(transaction);
        const transactionDoc = new TransactionModel({
            originator: transactionDTO.originator.id,
            beneficiary: transactionDTO.beneficiary.id,
            amount: transactionDTO.amount,
        });
        await transactionDoc.save();
    }

    async findByOriginator(originatorNumber: string): Promise<Transaction[]> {
        const transactionDocs = await TransactionModel.find({})
            .populate<{ originator: IAccountDocument; beneficiary: IAccountDocument }>([
                "originator",
                "beneficiary",
            ])
            .exec();

        return transactionDocs
            .filter((doc) => doc.originator.number === originatorNumber)
            .map((doc) =>
                TransactionMapper.toDomain({
                    originator: doc.originator,
                    beneficiary: doc.beneficiary,
                    amount: doc.amount,
                })
            );
    }

    async findByBeneficiary(beneficiaryNumber: string): Promise<Transaction[]> {
        const transactionDocs = await TransactionModel.find({})
            .populate<{ originator: IAccountDocument; beneficiary: IAccountDocument }>([
                "originator",
                "beneficiary",
            ])
            .exec();

        return transactionDocs
            .filter((doc) => doc.beneficiary.number === beneficiaryNumber)
            .map((doc) =>
                TransactionMapper.toDomain({
                    originator: doc.originator,
                    beneficiary: doc.beneficiary,
                    amount: doc.amount,
                })
            );
    }

    async deleteByOriginator(originatorNumber: string): Promise<void> {
        const originator = await AccountModel.findOne({number: originatorNumber}).exec();
        if (!originator) return;
        // Delete transactions referencing the originator's ObjectId
        await TransactionModel.deleteMany({originator: originator._id}).exec();
    }
}