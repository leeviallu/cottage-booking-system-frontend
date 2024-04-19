import { useState } from "react";
import axios from "axios";

const Areas = () => {
    const [areaName, setAreaName] = useState('');

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/areas',
            {
                "name": areaName
            }
        )
        setAreaName('');
    };

    return (
        <div>
            <h1>Areas</h1>
            <h2>Create a area</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Area Name:
                    <input type="text" value={areaName} onChange={handleAreaNameChange} />
                </label>
                <br />
               