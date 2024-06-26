import axios from 'axios';
import { useState } from 'react';
import './App.css';  // Import the CSS file

const Area = ({area}) => {
    const [currentArea, setCurrentArea] = useState({});
    const {name, areaId: id} = currentArea;
    const [editing, setEditing] = useState(false);
    const [areaName, setAreaName] = useState('');

    const handleAreaNameChange = (event) => {
        setAreaName(event.target.value);
    };

    const handlePut = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/areas/${id}`,
            {
                'name': areaName
            }
        ).then(() => {
            setAreaName(areaName);
            setCurrentArea({
                'areaId': id,
                'name': areaName
            });
        }).catch(err => {
            console.error('Error while editing area: ', err);
        });
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/areas/${id}`)
            .then(() => {
                setCurrentArea('');
            })
            .catch(err => {
                console.error('Error deleting data:', err);
            });
    };

    useState(() => {
        setCurrentArea(area);
        setAreaName(area.name);
    }, []);

    return (
        <div>
            { currentArea != '' &&
                    <div>{
                        editing
                            ?
                            <div>
                                <form onSubmit={handlePut}>
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
                                    <button className='btn' type="reset" onClick={() => setEditing(!editing)}>
                        Kumoa
                                    </button>
                                    <button className='btn' type="submit">Luo</button>
                                </form>
                                <br />
                            </div>
                            :
                            <div className='item-container'>
                                <div>{name}</div>
                                <div>
                                    <button className='btn' onClick={() => setEditing(!editing)}>
                                Muokkaa
                                    </button>
                                    <button className='btn' onClick={(event) => handleDelete(event, id)}>Poista</button>
                                </div>
                            </div>
                    }
                    </div>

            }
        </div>
    );
};

export default Area;
