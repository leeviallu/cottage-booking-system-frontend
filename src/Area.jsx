import axios from "axios";
import { useState } from "react";


const Area = ({area}) => {
    const {name, areaId: id} = area;
    const [editing, setEditing] = useState(false);
    const [areaName, setAreaName] = useState(name);

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/areas/${id}`,
            {
                "name": areaName
            }
        )
        setAreaName('');
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        try {
            axios.delete(`http://localhost:8080/api/areas/${id}`)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    return (
        <div>
            {
                editing 
                ?
                <ul key={id}>
                    <li>
                        <div>
                            {name} 
                            <button onClick={() => setEditing(!editing)}>
                            Edit
                            </button>
                            <button onClick={(event) => handleDelete(event, id)}>Remove</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Area Name:
                                <input type="text" value={areaName} onChange={handleAreaNameChange} />
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </li>
                </ul>
                :
                <ul key={id}>
                    <li>
                        {name} 
                        <button onClick={() => setEditing(!editing)}>
                        Edit
                        </button>
                        <button onClick={(event) => handleDelete(event, id)}>Remove</button>

                    </li>
                </ul>
            }
        </div>
    );
};

export default Area;