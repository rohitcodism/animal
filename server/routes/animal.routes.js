import { Router } from 'express';
import { createAnimalEntry, getAnimalEntries, updateAnimalEntry, deleteAnimalEntry, getAllAnimals } from '../controllers/animal.controller.js';

const router = Router();

router.route('/create-animal').post(createAnimalEntry);
router.route('/get-animal/:animalId').get(getAnimalEntries);
router.route('/update-animal/:animalId').put(updateAnimalEntry);
router.route('/delete-animal/:animalId').delete(deleteAnimalEntry);
router.route('/get-all-animals').get(getAllAnimals);


export default router;