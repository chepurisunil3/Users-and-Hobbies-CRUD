import { Model, model, Schema } from "mongoose";
import IHobbies, { PassionLevel } from "../interfaces/ihobbies.interface";
const HobbiesSchema = new Schema({
    passionLevel:{
        type:String,
        required:true,
        enum:PassionLevel
    },
    name:{
        type:String,
        required:true
    },
    year:Number
},
{ versionKey: false })

const Hobbies:Model<IHobbies> = model<IHobbies>('hobbies',HobbiesSchema);

export default Hobbies;
