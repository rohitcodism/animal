
import { asyncHandler } from '../utils/asyncHandler.js';
import Animal from '../models/animal.model.js';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';

const createAnimalEntry = asyncHandler(async(req,res) => {
    const {
        name,
        age,
        type,
        sex
    } = req.body;

    console.log('Animal Entry : ', req.body);

    if(!name || !age || !sex || !type){
        throw new apiError(400, "Please provide all the details of the animal");
    }

    const animal = await Animal.create({
        name,
        age,
        type,
        sex
    });

    const savedAnimal = await animal.save();


    return res
    .status(201)
    .json(new apiResponse(
        201,
        {
            message: "Animal created successfully",
            data: savedAnimal
        }
    ));
})

const getAnimalEntries = asyncHandler(async(req,res) => {

    const { animalId } = req.params;

    console.log('Animal Id :', animalId);

    if(!animalId){
        throw new apiError(400, "Please provide the animal id");
    }

    const animal = await Animal.findById(animalId);

    if(!animal){
        throw new apiError(404, "Animal not found");
    }

    return res
    .status(200)
    .json(new apiResponse(
        200,
        {
            message: "Animal found",
            data: animal
        }
    ));
});

const updateAnimalEntry = asyncHandler(async(req,res) => {
    const {
        name,
        age,
        type,
        sex
    } = req.body;

    console.log('Animal Entry : ', req.body);

    const { animalId } = req.params;

    if(!name && !age && !sex && !type){
        throw new apiError(400, "Please provide the details of the animal");
    }

    console.log('Animal Id :', animalId);

    if(!animalId){
        throw new apiError(400, "Please provide the animal id");
    }

    // Update the animal entry
    const animal = await Animal.findByIdAndUpdate(animalId, {
        name,
        age,
        type,
        sex
    }, {
        new: true
    });

    if(!animal){
        throw new apiError(404, "Animal not found");
    }

    return res
    .status(200)
    .json(new apiResponse(
        200,
        {
            message: "Animal updated successfully",
            data: animal
        }
    ));


});

const deleteAnimalEntry = asyncHandler(async(req,res) => {

    const { animalId } = req.params;

    if(!animalId){
        throw new apiError(400, "Please provide the animal id");
    }

    const animal = await Animal.findByIdAndDelete(animalId);

    if(!animal){
        throw new apiError(404, "Animal not found");
    }

    return res
    .status(200)
    .json(new apiResponse(
        200,
        {
            message: "Animal deleted successfully",
            data: animal
        }
    ));
});

const getAllAnimals = asyncHandler(async(req,res) => {
    try {
        const animals = await Animal.find();
        return res
        .status(200)
        .json(new apiResponse(
            200, 
            {
                message: "Animals fetched successfully",
                data: animals
            }
        ));
    } catch (error) {
        throw new apiError(500, "Internal Server Error");
    }
});


export {
    createAnimalEntry,
    getAnimalEntries,
    updateAnimalEntry,
    deleteAnimalEntry,
    getAllAnimals
}
