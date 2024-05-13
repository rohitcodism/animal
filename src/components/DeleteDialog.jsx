import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import toast from 'react-hot-toast';

export const DeleteDialog = ({ open, handleClose, id }) => {

    const handleDelete = async() => {
        
        axios.delete(`http://localhost:8000/api/v1/animals/delete-animal/${id}`)
        .then(() => {

            toast.success('Animal Deleted Successfully')
        })
        .catch((err) => {
            console.log(err) 

            toast.error('Something went wrong, please try again later')
        })
        .finally(() => {
            handleClose();

            window.location.reload();
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Animal"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this animal, this cannot be undone?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
