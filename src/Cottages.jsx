import { useState, useEffect } from 'react';
import axios from 'axios';
import Cottage from './Cottage';

const Cottages = () => {
    const [areas, setAreas] = useState([]);
    const [cottages, setCottages] = useState([]);
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [cottageSearchResults, setCottageSearchResults] = useState([]);

    const [formData, setFormData] = useState({
        areaId: '',
        postalcode: '',
        position: '',
        name: '',
        address: '',
        price: 0,
        description: '',
        capacity: 0,
        equipment: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { areaId, postalcode, position, name, address, price, description, capacity, equipment } = formData;
        if (validPostalCode(postalcode) == null) {
            console.error("Postalcode not given")
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
                            axios.post('http://localhost:8080/api/cottages',
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
                            ).then(() => {
                                setFormData({
                                    areaId: '',
                                    postalcode: 0,
                                    position: '',
                                    name: '',
                                    address: '',
                                    price: 0,
                                    description: '',
                                    capacity: '',
                                    equipment: ''
                                });
                                axios.get('http://localhost:8080/api/cottages')
                                    .then(res => {
                                        setCottages(res.data);
                                    })
                                    .catch(err => {
                                        console.error('Error while fetching cottages:', err);
                                    })
                            })
                            .catch(err => {
                                console.error("Error while posting cottage", err)
                            })
                        })
                        .catch(err => {
                            console.error("Error while posting postal", err)
                        })
                    }
                    else {
                        axios.post('http://localhost:8080/api/cottages',
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
                        ).then(() => {
                            setFormData({
                                areaId: '',
                                postalcode: 0,
                                position: '',
                                name: '',
                                address: '',
                                price: 0,
                                description: '',
                                capacity: '',
                                equipment: ''
                            });
                            axios.get('http://localhost:8080/api/cottages')
                                .then(res => {
                                    setCottages(res.data);
                                })
                                .catch(err => {
                                    console.error('Error while fetching cottages:', err);
                                })
                        })
                        .catch(err => {
                            console.error("Error while posting cottage", err)
                        })
                    }
                })
                .catch(err => {
                    console.error("Error while getting postalcode", err)
                })
        }
    };

    const validPostalCode = (code) => {
        return code.match(/^[/\d]{5}?$/) !== null      
    }      

    useEffect(() => {
        axios.get('http://localhost:8080/api/areas')
            .then(res => {
                setAreas(res.data);
                setFormData({...formData, areaId: res.data[0].areaId})
            })
            .catch(err => {
                console.error('Error while fetching areas:', err);
            })
        axios.get('http://localhost:8080/api/cottages')
            .then(res => {
                setCottages(res.data);
            })
            .catch(err => {
                console.error('Error while fetching cottages:', err);
            })   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        const filteredCottages = cottages.filter(cottage => 
            cottage.name != null 
            ?
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
            : null
        );
        setCottageSearchResults(filteredCottages);
    }, [cottages, cottageSearchTerm])

    return (
        <div>
            <h1>Cottages</h1>
            <h2>Create a cottage</h2>
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

                <button type="submit">Submit</button>
            </form>

            <h2>Search Cottage:</h2>
            <input id="cottagesearchterm" value={cottageSearchTerm} onChange={event => setCottageSearchTerm(event.target.value)} />
            <h3>Results:</h3>
            <div>
                {
                    cottageSearchResults.map(cottage => 
                        cottage.name != null 
                            ?    
                            <Cottage key={cottage.cottageId} cottage={cottage} />
                            :
                            null   
                    )
                }
            </div>
        </div>
    );
};

export default Cottages;