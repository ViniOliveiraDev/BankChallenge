import {IAccountRepository} from "../../../account/domain/IAccountRepository";
import {ITransactionRepository} from "../../domain/ITransactionRepository";
import {Transaction} from "../../domain/Transaction";

// Input DTO for ProcessTransactionUC
export interface ProcessTransactionInput {
    originatorNumber: string;
    beneficiaryNumber: string;
    amount: number;
}


export class ProcessTransactionUC {
    constructor(
        private accountRepository: IAccountRepository,
        private transactionRepository: ITransactionRepository
    ) {
    }

    async execute(input: ProcessTransactionInput): Promise<void> {
        // Validate input
        if (!input.originatorNumber || !input.beneficiaryNumber || input.amount === undefined) {
            throw new Error("All fields are required.");
        }

        if (input.amount <= 0) {
            throw new Error("Amount must be greater than zero.");
        }

        const originator = await this.accountRepository.findByNumber(input.originatorNumber);
        const beneficiary = await this.accountRepository.findByNumber(input.beneficiaryNumber);

        if (!originator || !beneficiary) {
            throw new Error("Originator or beneficiary account not found.");
        }

        const transaction = new Transaction(originator, beneficiary, input.amount);

        transaction.process();

        await this.accountRepository.update(originator);
        await this.accountRepository.update(beneficiary);

        await this.transactionRepository.save(transaction);
    }
}
