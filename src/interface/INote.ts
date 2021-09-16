import { Document } from "mongoose";

export interface INote extends Document {
    readonly title: string;
    readonly description: string;
    readonly done: boolean;
}