import { useState, useEffect } from 'react';
import axios from 'axios';
import Area from './Area';
import './App.css';

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [areaName, setAreaName] = useState('');
    const [creationMsg, setCreationMsg] = useState('');
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
            axios.get('http://localhost:8080/api/areas')
                .then((res) => {
                    setAreas(res.data);
                    setCreationMsg('Alue luotu.');
                    setTimeout(() => {
                        setCreationMsg('');
                    }, 4000);
                })
                .catch((err) => {
                    console.error('Error fetching areas:', err);
                });
        })
            .catch(err => {
                console.error('Error while submitting area:', err);
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
        axios.get('http://localhost:8080/api/areas')
            .then((res) => {
                setAreas(res.data);
            })
            .catch((err) => {
                console.error('Error fetching areas:', err);
            });
    }, []);


    return (
        <div className="container">
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
                {creationMsg != '' && <h3 style={{'color': 'green'}}>{creationMsg}</h3>}
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
