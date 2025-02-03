import {Schema} from "mongoose";

export interface IAccountDTO {
    id?: Schema.Types.ObjectId;
    number: string;
    name: string;
    balance: number;
}