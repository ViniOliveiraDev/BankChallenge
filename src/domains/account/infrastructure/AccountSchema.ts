import {Document, model, Schema} from 'mongoose';

export interface IAccountDocument extends Document {
    id: Schema.Types.ObjectId;
    number: string;
    name: string;
    balance: number;
}

// Mongoose Schema for Account
const AccountSchema: Schema = new Schema({
    number: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    balance: {type: Number, required: true, default: 0},
});

export const AccountModel = model<IAccountDocument>('Account', AccountSchema);