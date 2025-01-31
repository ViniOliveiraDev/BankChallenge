import {Document, model, Schema} from 'mongoose';

// Interface para o documento do MongoDB
export interface IAccountDocument extends Document {
    number: string;
    name: string;
    balance: number;
}

// Schema do Mongoose para Account
const AccountSchema: Schema = new Schema({
    number: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    balance: {type: Number, required: true, default: 0},
});

// Criar e exportar o modelo
export const AccountModel = model<IAccountDocument>('Account', AccountSchema);