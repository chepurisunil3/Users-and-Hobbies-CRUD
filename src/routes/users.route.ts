import express from 'express';
import { addNewUser, deleteUser, getAllUsers, getSpecificUser, updateExistingUser } from '../controllers/users.controller';
const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id',getSpecificUser)
router.post('/',addNewUser)
router.put('/:id',updateExistingUser)
router.delete('/:id',deleteUser)
export default router;