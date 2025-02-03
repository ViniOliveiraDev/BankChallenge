import {IAccountDTO} from "../../account/infrastructure/IAccountDTO";

export interface TransactionDTO {
    originator: IAccountDTO;
    beneficiary: IAccountDTO;
    amount: number;
}