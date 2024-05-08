import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useTheme, useMediaQuery, Autocomplete } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { animalTypes } from '../constants/animals';

const animalSchema = yup.object().shape({
    name: yup.string().required({ message: 'Name is required' }),
    type: yup.string().required({ message: 'Type is required' }),
    sex: yup.string(["Male", "Female", "Other"], { message: 'Invalid sex information'}).required({ message: 'Sex is required' }),
    age: yup.number().positive({ message: 'Age must be a positive number' }).integer().required({ message: 'Age is required' }),
}).required();


export const AnimalFormDialog = ({ open, handleClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(animalSchema),
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    console.log("Form errors", errors);

    const handleCreateAnimal = async(data) => {

        const response = await axios.post('http://localhost:8000/api/v1/animals/create-animal', data);

        console.log(response);
    };

    const onSubmit = (data) => {
        console.log(data);

        handleCreateAnimal(data)
        .then(response => {
            console.log(response);
            
            toast.success("Animal created successfully", { position: "bottom-right" });
            
        })
        .catch(error => {
            console.error(error);

            toast.error("Failed to create animal", { position: "bottom-right" });
        });

        handleClose();
        reset();
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Add New Animal</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("name")}
                        sx={{ marginBottom: 2 }}
                        error={!!errors.name}
                        helperText={errors.name?.message?.message}
                    />
                    <Autocomplete 
                        margin="dense"
                        label="Type"
                        type="text"
                        options={animalTypes.map((type) => type.label)}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        renderInput={(params) => <TextField {...params} label="Type" {...register("type")} error={!!errors.type} helperText={errors.type?.message?.message} />}
                    />
                    <Autocomplete 
                        margin="dense"
                        label="Sex"
                        type="text"
                        options={["Male", "Female", "Other"]}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2, scrollbarColor: 'white' }}
                        renderInput={(params) => <TextField {...params} label="Sex" {...register("sex")} error={!!errors.sex} helperText={errors.sex?.message?.message} />}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        type="number"
                        fullWidth
                        variant="outlined"
                        {...register("age")}
                        sx={{ marginBottom: 2 }}
                        error={!!errors.age}
                        helperText={errors.age?.message.includes("NaN") ?"Age field must be a number" : errors.age?.message}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', padding: 3 }}>
                    <Button onClick={handleClose} color="inherit" variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Add New Animal
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
