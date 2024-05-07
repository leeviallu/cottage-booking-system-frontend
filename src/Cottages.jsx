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
        postalcode: 0,
        position: '',
        name: '',
        address: '',
        price: 0,
        description: '',
        capacity: '',
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
                        // eslint-disable-next-line no-unused-vars
                        ).then(_response => {
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
                            )
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
                        )
                    }
                })
                
            
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
            })
        }
    };

    const validPostalCode = (code) => {
        return code.match(/^[/\d]{5}?$/) !== null      
    }
      

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
                setAreas(fetchedAreas.data);
                setFormData({...formData, areaId: fetchedAreas.data[0].areaId})
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchCottages = async () => {
            try {
                const fetchedCottages = await axios.get('http://localhost:8080/api/cottages');
                setCottages(fetchedCottages.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAreas();
        fetchCottages();
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

                <label htmlFor="postalcode">Postal Code:</label><br/>
                <input type="number" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} />
                <br />

                <label htmlFor="position">Position:</label><br/>
                <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} />
                <br />

                <label htmlFor="name">Name:</label><br/>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="address">Address:</label><br/>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                <br />


                
                <label htmlFor="price">Price:</label><br/>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                <br />


                <label htmlFor="description">Description:</label><br/>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <br />

                <label htmlFor="capacity">Capacity:</label><br/>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                <br />


                <label htmlFor="equipment">Equipment:</label><br/>
                <input type="text" id="equipment" name="equipment" value={formData.equipment} onChange={handleChange} />
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