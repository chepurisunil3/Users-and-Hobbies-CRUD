import { Document } from 'mongoose';
export default interface IHobbies extends Document {
    passionLevel:PassionLevel,
    name:string,
    year:number;
}
export enum PassionLevel {
    Low,
    Medium,
    High,
    VeryHigh
}
export function isIHobbies(object: any): object is IHobbies {
    return 'name' in object;
}