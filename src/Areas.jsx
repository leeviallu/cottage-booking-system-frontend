import { useState, useEffect } from 'react';
import axios from 'axios';
import Area from './Area';
import './App.css';  // Tuo CSS-tiedosto

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
                'name': areaName
            }
        ).then(() => {
            setAreaName('');
            fetchData();
        })
            .catch(err => {
                console.error('Error while submitting area:', err);
            });
    };

    const fetchData = async () => {
        axios.get('http://localhost:8080/api/areas')
            .then((res) => {
                setAreas(res.data);
            })
            .catch((err) => {
                console.error('Error fetching areas:', err);
            });
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
        <div className="container"> {/* Lisää areas-view luokka */}
            <h1>Luo alue</h1>
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
                <button className='btn' type="submit">Luo</button>
            </form>
            <form>
                <h2>Alueet:</h2>
                <input id="areasearchterm" value={areaSearchTerm} onChange={event => setAreaSearchTerm(event.target.value)} />
                <br />

            </form>

            <h3>Alueet:</h3>

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
