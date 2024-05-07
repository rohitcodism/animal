import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide the name of the animal."],
        unique: [true, "Two different animals cannot have same name"]
    },
    age:{
        type: Number,
        required: [true, "An animal should have an age"],
    },
    sex:{
        type: String,
        enum: ["Male", "Female", "Unknown"],
        required: [true, "An animal should have a specified sex"]
    }
})

const Animal = mongoose.models.animal || mongoose.model("animal", animalSchema);

export default Animal;