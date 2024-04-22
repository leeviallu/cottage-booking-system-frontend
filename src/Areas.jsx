import { useState, useEffect } from "react";
import axios from "axios";

const Areas = () => {
    const [areas, setAreas] = useState([]);
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
        fetchData();
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        try {
            axios.delete(`http://localhost:8080/api/areas/${id}`)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const fetchData = async () => {
        try {
            const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
            setAreas(fetchedAreas.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    useEffect(() => {
        fetchData();
    }, []);


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

            <h2>All areas</h2>
            <div>

            {
                areas.map(area => (
                    area.name == null 
                        ? 
                        null 
                        :
                        <ul key={area.areaId}>
                            <li>
                                {area.name} 
                                <button onClick={(event) => handleDelete(event, area.areaId)}>Remove</button>

                            </li>
                        </ul>
                    )
                )
            }
            </div>
          
        </div>
    );
};


export default Areas;