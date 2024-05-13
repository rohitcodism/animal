import axios from "axios";
import { useEffect, useState } from "react";
import { AnimalCard } from "./AnimalCard";
import { TextField } from "@mui/material";



export const Hero = () => {

    const [animals, setAnimals] = useState([]);
    const [search, setSearch] = useState("");

    const filteredAnimals = search ? animals.filter(animal => {
        return animal.name.toLowerCase().includes(search.toLowerCase());
    }) : animals;

    console.log(filteredAnimals);


    const handleSearch = (e) => {

        console.log(e.target.value);

        setSearch(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/animals/get-all-animals")
            .then(response => {
                console.log(response.data.data.data);
                setAnimals(response.data.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [animals.length]);

    if (animals.length === 0) return (
        <div>Loading...</div>
    );


    return (
        <div
            className="hero min-h-screen py-8"
        >
            <div
                className="flex flex-col items-center justify-center w-full"
            >
                <h3
                    className="hero-text text-2xl font-bold text-center mt-8"
                >
                    Welcome to the Animal Directory
                </h3>
                <div className="flex justify-center items-center my-6 ">
                    <input
                        type="text"
                        className="form-input px-4 py-2 w-full max-w-xl border-2 border-gray-300 focus:border-blue-500 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        placeholder="Search animals by name"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div
                    className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
                >
                    {filteredAnimals.map((animal) => (
                        <AnimalCard
                            key={animal._id}
                            name={animal.name}
                            type={animal.type}
                            age={animal.age}
                            sex={animal.sex}
                            id={animal._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}