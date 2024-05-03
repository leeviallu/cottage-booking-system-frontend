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
        )
        setAreaName('');
        window.location.reload();
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        try {
            axios.delete(`http://localhost:8080/api/areas/${id}`)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
        window.location.reload();
    }

    return (
        <div>
            {
                editing 
                ?
                <div>
                    <div>
                        <form onSubmit={handlePut}>
                            <label>
                                Area Name:
                                <br />
                                <input type="text" value={areaName} onChange={handleAreaNameChange} />
                            </label>
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
        </div>
    );
};

export default Area;