import IUser from "../interfaces/iuser.interface";
import User from "../models/user.model";
import mongoose from 'mongoose';
import { IError } from "../interfaces/ierror.interface";

export const findAll = async (): Promise<IUser[]> => {
    try {
        const users:IUser[] = await User.find().select({hobbies:0});
        return users;
    }
    catch (e)
    {
        console.log(e)
        return [];
    }
    
}

export const findUserWithId = async (id:string): Promise<IUser|null> => {
    const user:IUser|null = await User.findById(id).select({hobbies:0});
    return user;
}

export const addUser = async (user:IUser): Promise<IUser|IError> => {
    try {
        const userToSave:IUser = new User(user);
        const err = userToSave.validateSync();
        err instanceof mongoose.Error;
        if(err)
        {
            const messageToShow:string = err.message;
            const error:IError = {name:err.name,message:messageToShow};
            return error;
        }
        await userToSave.save();
        return userToSave;
            
    }
    catch(exception)
    {
        const messageToShow:string = exception.message;
        const error:IError = {name:exception.name,message:messageToShow};
        return error;
    }
}
export const updateUser = async (id:string,user:IUser): Promise<IUser|IError> => {
    try {
        if(!await User.findById(id))
        {
            const error:IError = {name:"Not Found!",message:"The user is not found"};
            return error;
        }
        const updatedUser:IUser|null = await User.findByIdAndUpdate(id, user,{new:true});
        if (updatedUser)
            return updatedUser;
        else
        {
            const error:IError = {name:"No records to Update!",message:"Cannot update the selected fields, Probably the details are already updated"};
            return error;
        }
    }
    catch(exception)
    {
        console.log(exception)
        const messageToShow:string = exception.message;
        const error:IError = {name:exception.name,message:messageToShow};
        return error;
    }
}
export const removeUser = async (id:string): Promise<boolean> => {
    try {
        await User.findByIdAndDelete(id);
        return true;
    }
    catch(exception)
    {
        console.log(exception)
        return false;
    }
}