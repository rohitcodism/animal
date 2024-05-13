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


export const AnimalUpdate = ({ open, handleClose, name, type, sex, age, id }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(animalSchema),
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCreateAnimal = async(data) => {

        console.log("Animal : ", data);

        const response = await axios.put(`http://localhost:8000/api/v1/animals/update-animal/${id}`, data);

        console.log(response);
    };

    const onSubmit = (data) => {

        handleCreateAnimal(data)
        .then(()=> {
            
            toast.success("Animal updated successfully", { position: "bottom-right" });
            
        })
        .catch(()=> {

            toast.error("Failed to update animal", { position: "bottom-right" });
        })
        .finally(() => {
            window.location.reload();
        })

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
                        defaultValue={name}
                    />
                    <Autocomplete 
                        margin="dense"
                        label="Type"
                        type="text"
                        options={animalTypes.map((type) => type.label)}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        renderInput={(params) => <TextField {...params} label="Type" {...register("type")} error={!!errors.type} helperText={errors.type?.message?.message}/>}
                    />
                    <Autocomplete 
                        margin="dense"
                        label="Sex"
                        type="text"
                        options={["Male", "Female", "Unknown"]}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2, scrollbarColor: 'white' }}
                        renderInput={(params) => <TextField {...params} label="Sex" {...register("sex")} error={!!errors.sex} helperText={errors.sex?.message?.message}/>}
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
                        defaultValue={age}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', padding: 3 }}>
                    <Button onClick={handleClose} color="inherit" variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Save changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
