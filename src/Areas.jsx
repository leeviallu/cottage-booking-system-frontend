import { useState, useEffect } from "react";
import axios from "axios";
import Area from "./Area";

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [areaName, setAreaName] = useState('');
    const [areaSearchTerm, setAreaSearchTerm] = useState('');
    const [areaSearchResults, setAreaSearchResults] = useState([]);

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/areas',
            {
                "name": areaName
            }
        ).then(() => {
            setAreaName('');
            fetchData();
        })
        .catch(err => {
            console.error("Error while submitting area:", err);
        })
    };

    const fetchData = async () => {
        axios.get('http://localhost:8080/api/areas')
            .then((res) => {
                setAreas(res.data);
            })
            .catch((err) => {
                console.error('Error fetching areas:', err);
            })
    };

    useEffect(() => {
        const filteredAreas = areas.filter(area =>
            area.name != null 
            ? 
            area.name.toLowerCase().includes(areaSearchTerm.toLowerCase()) 
            :
            null
        );
        setAreaSearchResults(filteredAreas);
    }, [areas, areaSearchTerm]);

    
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <h1>Alueet</h1>
            <h2>Luo alue</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="areaName">Alueen nimi:</label>
                <br/>
                <input 
                    type="text" 
                    id="areaName"
                    name="areaName"
                    value={areaName} 
                    onChange={handleAreaNameChange} 
                    onInvalid={e => e.target.setCustomValidity('Area name is required')} 
                    onInput={e => e.target.setCustomValidity('')}
                    required
                />                
                <br />
                <button type="submit">Luo</button>
            </form>

            <h2>Alueet:</h2>
            <input id="areasearchterm" value={areaSearchTerm} onChange={event => setAreaSearchTerm(event.target.value)} />
            <br />
            <h3>Tulokset:</h3>

            <div>
                {
                    areaSearchResults.map(area => 
                    
                    
                        area.name != null 
                            ?    
                            <Area key={area.areaId} area={area} />  
                            :
                            null
                        )
                    
                }
            </div>
          
        </div>
    );
};


export default Areas;