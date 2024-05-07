import axios from "axios";
import { useState } from "react";


const Area = ({area}) => {
    const {name, areaId: id} = area;
    const [editing, setEditing] = useState(false);
    const [areaName, setAreaName] = useState(name);

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handlePut = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/areas/${id}`,
            {
                "name": areaName
            }
        ).then(() => {
            setAreaName('');
            window.location.reload();
        }).catch(err => {
            console.error("Error while editing area: ", err)
        })
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/areas/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Error deleting data:', err);
            })
    }

    return (
        <div>
            {
                editing 
                ?
                <div>
                    <div>
                        <form onSubmit={handlePut}>
                            <label htmlFor="areaName">Area Name:</label>
                            <br/>
                            <input 
                                type="text" 
                                id="areaName"
                                name="areaName"
                                value={areaName} 
                                onChange={handleAreaNameChange} 
                                onInvalid={e => e.target.setCustomValidity('Area name is required')} 
                                onInput={e => e.target.setCustomValidity('')} pattern="[0-9]{5}"
                                required
                            />           
                            <br />
                            <button type="button" onClick={() => setEditing(!editing)}>
                            Undo                        
                            </button>
                            <button type="submit">Submit</button>
                        </form>
                        <br />
                    </div>
                </div>
                :
                <div>
                    {name} 
                    <br />

                    <button onClick={() => setEditing(!editing)}>
                    Edit
                    </button>
                    <button onClick={(event) => handleDelete(event, id)}>Remove</button>
                </div>  
            }
        <br/>
        </div>
    );
};

export default Area;