import axios from "axios";
import { useState, useEffect } from "react";

const Cottage = ({cottage}) => {
    const [areas, setAreas] = useState([]);

    const [editing, setEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        areaId: cottage.area.areaId,
        postalcode: cottage.postal.postalcode,
        position: cottage.postal.position,
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
        const { areaId, postalcode, position, name, address, price, description, capacity, equipment } = formData;
        const id = cottage.cottageId;

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
            
                <label htmlFor="areaId">Area:</label>
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

                <label htmlFor="name">Name:</label><br/>
                <input type="text" required id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="address">Address:</label><br/>
                <input type="text" required id="address" name="address" value={formData.address} onChange={handleChange} />
                <br />

                <label htmlFor="postalcode">Postal Code:</label><br/>
                <input type="text" required pattern="[0-9]{5}" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} />
                <br />

                <label htmlFor="position">Postal Position:</label><br/>
                <input type="text" required id="position" name="position" value={formData.position} onChange={handleChange} />
                <br />

                <label htmlFor="description">Description:</label><br/>
                <textarea type="text" cols="30" rows="5" id="description" name="description" value={formData.description} onChange={handleChange} />
                <br />

                <label htmlFor="equipment">Equipment:</label><br/>
                <textarea type="text" cols="30" rows="5" id="equipment" name="equipment" value={formData.equipment} onChange={handleChange} />
                <br />
                <br />

                <label htmlFor="capacity">Capacity:</label><br/>
                <input type="number" required min="1" max="100000" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                <br />

                <label htmlFor="price">Price:</label><br/>
                <input type="number" required min="1" max="100000" id="price" name="price" value={formData.price} onChange={handleChange} />
                <br />
                <br />  
                
                <button type="button" onClick={() => setEditing(!editing)}>
                Undo                        
                </button>

                <button type="submit">Submit</button>
                <br/>
            </form>

            :
            <div key={cottage.cottageId}>
                <p>
                <b>Area:</b> {cottage.area.name}
                <br/>
                <b>Name:</b> {cottage.name}
                <br/>            
                <b>Address:</b> {cottage.address}
                <br/>
                <b>Description:</b> {cottage.description}
                <br/>
                <b>Equipment:</b> {cottage.equipment}
                <br/>
                <b>Capacity:</b> {cottage.capacity}
                <br/>
                <b>Price:</b> {cottage.price}
                <br/>
                </p>
                <button onClick={() => setEditing(!editing)}>Edit</button>

                <button onClick={(event) => handleDelete(event, cottage.cottageId)}>Remove</button>
                <br/>
                <br/>
                <br/>
            </div>
        
       
            }
        </div>
            
    );
};

export default Cottage;