import axios from "axios";
import { useState, useEffect } from "react";
import postalcodes from 'datasets-fi-postalcodes';

const Cottage = ({cottage}) => {
    const postals = Object.keys(postalcodes).map((key) => [key, postalcodes[key]]);
    const [areas, setAreas] = useState([]);
    const [editing, setEditing] = useState(false);
    const [postalSearchTerm, setPostalSearchTerm] = useState("");
    const [filteredPostalcodes, setFilteredPostalcodes] = useState([]);   
    const [formData, setFormData] = useState({
        areaId: cottage.area.areaId,
        postalcode: cottage.postal.postalcode,
        name: cottage.name,
        address: cottage.address,
        price: cottage.price,
        description: cottage.description,
        capacity: cottage.capacity,
        equipment: cottage.equipment
    });    
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { areaId, postalcode, name, address, price, description, capacity, equipment } = formData;
        const id = cottage.cottageId;
        const position = postalcodes[postalcode];
        if (position == null) {
            console.error("Given postalcode doesn't exist.")
        } else {
            axios.get('http://localhost:8080/api/postal/' + postalcode)
                .then(response => {
                    if(response.data == "") {
                        axios.post('http://localhost:8080/api/postal', 
                                    {
                                        "postalcode": postalcode,
                                        "position": position
                                    }
                        ).then(() => {
                            axios.put(`http://localhost:8080/api/cottages/${id}`,
                                {
                                    "description": description,
                                    "address": address,
                                    "postal": {
                                                "postalcode": postalcode
                                            },
                                    "name": name,
                                    "price": price,
                                    "equipment": equipment,
                                    "area": {
                                                "areaId": areaId
                                            },
                                    "capacity": capacity
                                }
                            )
                            .then(() => {
                                window.location.reload();
                            })
                            .catch(err => {
                                console.error("Error while editing cottage", err)
                            })
                        })
                        .catch(err => {
                            console.error("Error while posting postal", err)
                        })
                    }
                    else {
                        axios.put(`http://localhost:8080/api/cottages/${id}`,
                            {
                                "description": description,
                                "address": address,
                                "postal": {
                                            "postalcode": postalcode
                                        },
                                "name": name,
                                "price": price,
                                "equipment": equipment,
                                "area": {
                                            "areaId": areaId
                                        },
                                "capacity": capacity
                            }
                        )
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(err => {
                            console.error("Error while editing cottage", err)
                        })
                    }
                }).catch(err => {
                    console.error("Error while fetching postal", err)
                })
        }
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/cottages/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Error while deleting cottage:', err);
            })
    }

    useEffect(() => {
        const filteredPostals = postals.filter(postal => 
            postal[0].includes(postalSearchTerm)
        );
        setFilteredPostalcodes(filteredPostals);
        if (filteredPostals.length != 0 && filteredPostals.length != postals.length) {
            setFormData({...formData, postalcode: filteredPostals[0][0]})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalSearchTerm])

    useEffect(() => {
        axios.get('http://localhost:8080/api/areas')
            .then(res => {
                setAreas(res.data);
            })
            .catch(err => {
                console.error("Error while fetching areas: ", err)
            })
    }, []);

    return (
        <div>
            {
                editing
            ?
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="areaId">Alue:</label>
                <br />
                <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
                    {areas.map((area) => (
                        <option key={area.areaId} value={area.areaId}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <br />
                <br />

                <label htmlFor="name">Nimi:</label><br/>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}  
                    onInvalid={e => e.target.setCustomValidity('Name required')} 
                    onInput={e => e.target.setCustomValidity('')}
                    required
                />
                <br />

                <label htmlFor="address">Osoite:</label><br/>
                <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Address required')} onInput={e => e.target.setCustomValidity('')} 
                    required
                />
                <br />

                <label htmlFor="postalSearchTerm">Postiosoite:</label><br/>
                <input 
                    type="number"
                    id="postalSearchTerm" 
                    value={postalSearchTerm} 
                    onChange={event => setPostalSearchTerm(event.target.value)} 
                />
                <br />
                <select id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange}>
                    {
                        filteredPostalcodes.map((postalcode) => (
                                <option key={postalcode[0]} value={postalcode[0]}>
                                    {postalcode[0]} {postalcode[1]}
                                </option>
                            )
                        )        
                    }
                </select>
                <br />

                <label htmlFor="description">Kuvaus:</label><br/>
                <textarea 
                    type="text" 
                    id="description"
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    cols="30" 
                    rows="5" 
                />
                <br />

                <label htmlFor="equipment">Lisäpalvelut:</label><br/>
                <textarea 
                    type="text" 
                    id="equipment" 
                    name="equipment" 
                    value={formData.equipment} 
                    onChange={handleChange} 
                    cols="30" 
                    rows="5" 
                />
                <br />
                <br />

                <label htmlFor="capacity">Kapasiteetti:</label><br/>
                <input 
                    type="number" 
                    id="capacity" 
                    name="capacity" 
                    value={formData.capacity} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Capacity must be bigger than 0.')} 
                    onInput={e => e.target.setCustomValidity('')} 
                    min="1" 
                    max="100000" 
                    required 
                />
                <br />

                <label htmlFor="price">Hinta:</label><br/>
                <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Price must be bigger than 0.')} 
                    onInput={e => e.target.setCustomValidity('')} 
                    min="1" 
                    max="100000" 
                    required 
                />
                <br />
                <br />

                    
                <button type="button" onClick={() => setEditing(!editing)}>
                Kumoa                        
                </button>

                <button type="submit">Luo</button>
                <br/>
            </form>

            :
            <div key={cottage.cottageId}>
                <p>
                <b>Alue:</b> {cottage.area.name}
                <br/>
                <b>Nimi:</b> {cottage.name}
                <br/>            
                <b>Osoite:</b> {cottage.address}
                <br/>
                <b>Kuvaus:</b> {cottage.description}
                <br/>
                <b>Lisäpalvelut:</b> {cottage.equipment}
                <br/>
                <b>Kapasiteetti:</b> {cottage.capacity}
                <br/>
                <b>Hinta:</b> {cottage.price}
                <br/>
                </p>
                <button onClick={() => setEditing(!editing)}>Muokkaa</button>

                <button onClick={(event) => handleDelete(event, cottage.cottageId)}>Poista</button>
                <br/>
                <br/>
                <br/>
            </div>
        
       
            }
        </div>
            
    );
};

export default Cottage;