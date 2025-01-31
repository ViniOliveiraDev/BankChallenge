import {Transaction} from "../domain/Transaction";
import {TransactionDTO} from "./ITransactionDTO";
import {AccountMapper} from "../../account/infrastructure/AccountMapper";

export class TransactionMapper {
    static toDTO(transaction: Transaction): TransactionDTO {
        return {
            originator: AccountMapper.toDTO(transaction.originator),
            beneficiary: AccountMapper.toDTO(transaction.beneficiary),
            amount: transaction.amount,
        };
    }

    static toDomain(transactionDTO: TransactionDTO): Transaction {
        return new Transaction(
            AccountMapper.toDomain(transactionDTO.originator),
            AccountMapper.toDomain(transactionDTO.beneficiary),
            transactionDTO.amount
        );
    }
}