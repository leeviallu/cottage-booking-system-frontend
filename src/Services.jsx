import { useState } from "react";

const Services = () => {
    const[name,setName]=useState("");
    const[area,setArea]=useState("");
    const[description,setDescription]=useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAreaChange = (e) => {
        setArea(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleCreate = (e) => {
        e.preventDefault();
        console.log(name,description, area);
    };

    return (
        <div>
            <h1>Create Service</h1>
            <form onSubmit={handleCreate}>
                <label>
                    Name:
                    <input type="text" value={name}onChange={handleNameChange}/>
                </label>
                <br/>
            
                <label>
                    Description:
                    <input type="text" value={description}onChange={handleDescriptionChange}/>
                </label>
                <br/>
                <label>
                    Area:
                    <input type="text" value={area}onChange={handleAreaChange}/>
                </label>
                <br/>
                <button type="create">Create</button>
            </form>
        </div>
    );
};

export default Services;



