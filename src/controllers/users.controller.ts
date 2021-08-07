import {Request,Response,NextFunction} from "express";
import { IError, isIError } from "../interfaces/ierror.interface";
import IUser from "../interfaces/iuser.interface";
import { addUser, findAll, findUserWithId, removeUser, updateUser } from "../services/user.service";

export const getAllUsers = async (req: Request,res: Response,next: NextFunction) => {
    const users:IUser[] = await findAll();
    return res.status(200).json(users)
}
export const getSpecificUser = async (req: Request,res: Response,next: NextFunction) => {
    const id:string = req.params.id as string;
    const user:IUser|null = await findUserWithId(id);
    if(user)
        return res.status(200).json(user)
    else 
        return res.status(400).json({success:false,message:"Cannot find the user!"})
}
export const addNewUser = async (req: Request,res: Response,next: NextFunction) => {
    const user:IUser = req.body;
    const newUser:IUser|IError = await addUser(user)
    if(!isIError(newUser))
    {
        return res.status(200).json(newUser)
    }
    else {
        return res.status(400).json({name:newUser.name,message:newUser.message})
    }
    
}
export const updateExistingUser = async (req: Request,res: Response,next: NextFunction) => {
    const userId:string = req.params.id;
    const updateData:IUser = req.body;
    const updatedUser:IUser|IError = await updateUser(userId,updateData);
    if(!isIError(updatedUser))
    {
        return res.status(200).json(updatedUser)
    }
    else {
        return res.status(400).json({name:"User not found",message:"Cannot find the User Specified"})
    }
}
export const deleteUser = async (req: Request,res: Response,next: NextFunction) => {
    const id:string = req.params.id as string;
    const isDeleted:boolean = await removeUser(id);
    if(isDeleted)
    {
        return res.status(200).json({success:true})
    }
    else {
        return res.status(400).json({name:"User not found",message:"Cannot find the User Specified"})
    }
}