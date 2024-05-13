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
            console.error("Virhe alueen muokkauksessa: ", err)
        })
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/areas/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Virhe alueen poistossa:', err);
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
                            <label htmlFor="areaName">Alueen nimi:</label>
                            <br/>
                            <input 
                                type="text" 
                                id="areaName"
                                name="areaName"
                                value={areaName} 
                                onChange={handleAreaNameChange} 
                                onInvalid={e => e.target.setCustomValidity('Alueen nimi ei saa olla tyhjä!')} 
                                onInput={e => e.target.setCustomValidity('')}
                                required
                            />           
                            <br />
                            <button type="button" onClick={() => setEditing(!editing)}>
                            Undo                        
                            </button>
                            <button type="submit">Luo</button>
                        </form>
                        <br />
                    </div>
                </div>
                :
                <div>
                    {name} 
                    <br />

                    <button onClick={() => setEditing(!editing)}>
                    Muokkaa
                    </button>
                    <button onClick={(event) => handleDelete(event, id)}>Poista</button>
                </div>  
            }
        <br/>
        </div>
    );
};

export default Area;