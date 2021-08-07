import IHobbies, { isIHobbies } from "../interfaces/ihobbies.interface";
import Hobbies from "../models/hobbies.model";
import User from "../models/user.model";
import mongoose from 'mongoose';
import { IError } from "../interfaces/ierror.interface";
import IUser from "../interfaces/iuser.interface";

export const findAllHobbiesForUser = async (userId:string): Promise<IHobbies[]|IError> => {
    const user:IUser|null = await User.findById(userId).select({name:0,__v:0,_id:0})
    if (user)
    {
        const populatedHobbies = await user.populate('hobbies').execPopulate();
        const hobbies:IHobbies[] = populatedHobbies.hobbies as IHobbies[];
        return hobbies;
    }
    else {
        const error:IError = {name:"User Not Found!",message:"The given user was not found"}
        return error;
    }
}

export const findHobbyWithId = async (id:string): Promise<IHobbies|IError> => {
    const hobby:IHobbies|null = await Hobbies.findById(id);
    if(hobby != null)
    {
        return hobby;
    }
    else {
        const error:IError = {name:"Hobby not found",message:"Cannot find the specified hobby"}
        return error;
    }
   
}

export const addHobbyForUser = async (userId:string,hobby:IHobbies): Promise<IHobbies|IError> => {
    try {
        if (await User.findById(userId) != null)
        {
            const hobbiesToSave:IHobbies = new Hobbies(hobby);
            const err = hobbiesToSave.validateSync();
            err instanceof mongoose.Error;
            if(err)
            {
                const messageToShow:string = err.message;
                const error:IError = {name:err.name,message:messageToShow};
                return error;
            }
            await hobbiesToSave.save();
            await User.findByIdAndUpdate(userId,{$addToSet:{hobbies:hobbiesToSave._id.toString()}})
            return hobbiesToSave;
        }
        else {
            const error:IError = {name:"Not Found!",message:"The user is not found"};
            return error;
        }
        
    }
    catch(exception)
    {
        const error:IError = {name:exception.name,message:exception.message};
        return error;
    }
}
export const updateHobby = async (hobbyId:string,hobby:IHobbies): Promise<IHobbies|IError> => {
    try {
        const updatedHobby:IHobbies|null = await Hobbies.findByIdAndUpdate(hobbyId, hobby,{new: true});
        if(updatedHobby == null)
        {
            const err:IError = {message:"No Records to Update!",name:"No Records to Update"}
            return err;
        }
        else {
            return updatedHobby;
        }
        
    }
    catch(exception)
    {
        console.log(exception)
        const err:IError = {message:exception.message,name:exception.message}
        return err;
    }
}
export const removeHobby = async (hobbyId:string): Promise<boolean> => {
    try {
        await Hobbies.findByIdAndDelete(hobbyId);
        return true;
    }
    catch(exception)
    {
        console.log(exception)
        return false;
    }
}