import { model, Schema, Model,Types } from 'mongoose';
import IUser from '../interfaces/iuser.interface';
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    hobbies:{
        type:[{type:Types.ObjectId,
            ref:"hobbies"}],
        default:[]
    }
},
{ versionKey: false });

const User:Model<IUser> = model<IUser>('user',UserSchema);

export default User;