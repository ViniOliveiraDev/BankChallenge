import {IAccountDocument} from "../../account/infrastructure/AccountSchema";
import {model, Schema, Types} from "mongoose";

export interface ITransactionDocument extends Document {
    originator: Types.ObjectId | IAccountDocument;
    beneficiary: Types.ObjectId | IAccountDocument;
    amount: number;
}

const TransactionSchema: Schema = new Schema({
    originator: {type: Schema.Types.ObjectId, ref: "Account", required: true},
    beneficiary: {type: Schema.Types.ObjectId, ref: "Account", required: true},
    amount: {type: Number, required: true},
});

export const TransactionModel = model<ITransactionDocument>(
    "Transaction",
    TransactionSchema
);