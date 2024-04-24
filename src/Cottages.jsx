import { useState, useEffect } from 'react';
import axios from 'axios';
import Cottage from './Cottage';

const Cottages = () => {
    const [areas, setAreas] = useState([]);
    const [cottages, setCottages] = useState([]);
    const [areaSearchTerm, setAreaSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [formData, setFormData] = useState({
        areaId: '',
        postalcode: 0,
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
        const { areaId, postalcode, name, address, price, description, capacity, equipment } = formData;
        e.preventDefault();
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
        setFormData({
            areaId: '',
            postalcode: 0,
            name: '',
            address: '',
            price: 0,
            description: '',
            capacity: '',
            equipment: ''
        })
    };

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
                setAreas(fetchedAreas.data);
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
        const filteredAreas = areas.filter(area =>
            area.name == null ? null :
            area.name.toLowerCase().includes(areaSearchTerm.toLowerCase())
        );
        setSearchResults(filteredAreas);
      }, [areas, areaSearchTerm]);

    return (
        <div>
            <h1>Cottages</h1>
            <h2>Create a cottage</h2>
            <form onSubmit={handleSubmit}>
            
                
                <label htmlFor="items">Area:</label>
                <br />
                <input value={areaSearchTerm} onChange={event => setAreaSearchTerm(event.target.value)} />
                <br />
                
                <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
                    {searchResults.map((area) => (
                        <option key={area.areaId} value={area.areaId}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="postalcode">Postal Code:</label><br/>
                <input type="number" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} min="10000" max="99999" />
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

            <h2>All cottages</h2>
            <div>
                {
                    cottages.map(cottage => 
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