import { Document, PopulatedDoc } from 'mongoose';
import IHobbies from "./ihobbies.interface";

export default interface IUser extends Document {
    _id: string,
    name: string,
    hobbies:PopulatedDoc<IHobbies & Document>|string
}
export function isIUser(object: any): object is IUser {
    return 'name' in object;
}