import { useState } from "react";

const Areas = () => {
    const [areaName, setAreaName] = useState('');

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Area Name:', areaName);
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export default Areas;