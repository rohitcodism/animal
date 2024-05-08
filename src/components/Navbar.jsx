import { useState } from 'react';
import {
    AnimalFormDialog
} from './AnimalForm.jsx'

export const Navbar = () => {

    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div
            className="navbar top-0 fixed w-full bg-gray-800 text-white p-4 flex justify-between items-center z-10"
        >
            <div className="text-2xl font-bold">Animal Directory</div>
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={handleOpen}
                >
                    Add new animal
                </button>
                <AnimalFormDialog
                    open={open}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
}