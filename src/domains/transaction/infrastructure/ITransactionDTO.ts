import {Schema} from "mongoose";

export interface TransactionDTO {
    originator: Schema.Types.ObjectId;
    beneficiary: Schema.Types.ObjectId;
    amount: number;
}