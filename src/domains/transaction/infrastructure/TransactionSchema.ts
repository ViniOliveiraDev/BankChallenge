import {IAccountDocument} from "../../account/infrastructure/AccountSchema";
import {model, Schema, Types} from "mongoose";

export interface ITransactionDocument extends Document {
    originator: Types.ObjectId | IAccountDocument;
    beneficiary: Types.ObjectId | IAccountDocument;
    amount: number;
}

// Schema do Mongoose para Transaction
const TransactionSchema: Schema = new Schema({
    originator: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    beneficiary: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    amount: {type: Number, required: true},
});

// Criar e exportar o modelo
export const TransactionModel = model<ITransactionDocument>('Transaction', TransactionSchema);