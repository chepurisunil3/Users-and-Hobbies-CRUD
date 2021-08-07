import {Request,Response,NextFunction} from "express";
import { IError, isIError } from "../interfaces/ierror.interface";
import IHobbies, { isIHobbies } from "../interfaces/ihobbies.interface";
import { addHobbyForUser, findAllHobbiesForUser, findHobbyWithId, removeHobby, updateHobby } from "../services/hobbies.service";

export const getAllHobbiesForUser = async (req: Request,res: Response,next: NextFunction) => {
    const userId:string = req.params.userId;
    const hobbies:IHobbies[]|IError = await findAllHobbiesForUser(userId);
    if(!isIError(hobbies))
    {
        return res.status(200).json(hobbies)
    }
    else {
        return res.status(400).json({name:"User not found!",message:"Cannot find the user to retrieve the hobbies"})
    }
    
}

export const getSpecificHobbyForUser = async (req: Request,res: Response,next: NextFunction) => {
    const id:string = req.params.id as string;
    const hobby:IHobbies|IError = await findHobbyWithId(id);
    if(!isIError(hobby))
        return res.status(200).json(hobby)
    else 
        return res.status(400).json({success:false,message:"Cannot find the Hobby!"})
}

export const addNewHobby = async (req: Request,res: Response,next: NextFunction) => {
    const hobby:IHobbies = req.body;
    const userId:string = req.params.userId
    const newHobby:IHobbies|IError = await addHobbyForUser(userId,hobby)
    if(!isIError(newHobby))
    {
        return res.status(200).json(newHobby)
    }
    else {
        return res.status(400).json({name:newHobby.name,message:newHobby.message})
    }
}

export const updateExistingHobby = async (req: Request,res: Response,next: NextFunction) => {
    const hobbyId:string = req.params.id;
    const updateData:IHobbies = req.body;
    const updatedHobby = await updateHobby(hobbyId,updateData)
    if(!isIError(updatedHobby))
    {
        return res.status(200).json(updatedHobby)
    }
    else {
        return res.status(200).json({success:false,message:"Cannot find the hobby"})
    }
    
}

export const deleteHobbyForUser = async (req: Request,res: Response,next: NextFunction) => {
    const id:string = req.params.id as string;
    const isDeleted:boolean = await removeHobby(id);
    if(isDeleted)
    {
        return res.status(200).json({success:true})
    }
    else {
        return res.status(400).json({name:"User not found",message:"Cannot find the User Specified"})
    }
}