import { useState } from 'react';
import { AnimalUpdate } from './AnimalUpdate';
import { DeleteDialog } from './DeleteDialog';

export const AnimalCard = ({ name, type, sex, age, id }) => {

    const [ open, setOpen ] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };



    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-700">{name}</div>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Type:</span> {type}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Sex:</span> {sex}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-bold">Age:</span> {age} months
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={handleOpen}>
                    Edit
                </button>
                <AnimalUpdate 
                    open={open}
                    handleClose={handleClose}
                    name={name}
                    type={type}
                    sex={sex}
                    age={age}
                    id={id}
                />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleOpenDelete}>
                    Delete
                </button>
                <DeleteDialog 
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    id={id}
                />
            </div>
        </div>
    );
};
