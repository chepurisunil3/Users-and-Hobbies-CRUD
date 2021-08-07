import express from 'express';
import { addNewHobby, deleteHobbyForUser, getAllHobbiesForUser, getSpecificHobbyForUser, updateExistingHobby } from '../controllers/hobbies.controller';
const router = express.Router();

router.get('/:userId',getAllHobbiesForUser)
router.get('/hobby/:id',getSpecificHobbyForUser)
router.post('/:userId',addNewHobby)
router.put('/:id',updateExistingHobby)
router.delete('/:id',deleteHobbyForUser)
export default router;