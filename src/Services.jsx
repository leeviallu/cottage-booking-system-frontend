
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Services = () => {
    const[areas,setAreas]=useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        serviceId:'',
        areaId: '',
        name: '',
        type: '',
        description: '',
        price:'',
    });

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    };
    

    const handleCreate = (e) => {
        const { serviceId,areaId, name, type, description, price}=formData;
    
        e.preventDefault();
        axios.post('http://localhost:8080/api/services',
            {
            
                "serviceId":serviceId,
                "area": {
                    "areaId": areaId
                },
                "name":name,
                "type": type,
                "description":description,
                "price": price,
    
            }
        )
        setFormData({
            serviceId:'',
        areaId: '',
        name: '',
        type: '',
        description: '',
        price:'',
        })
    };
    const handleDelete = (event, id) => {
        event.preventDefault();
        try {
            axios.delete(`http://localhost:8080/api/services/${id}`)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
                setAreas(fetchedAreas.data);
                setFormData({areaId: fetchedAreas.data[0].areaId});

                const fetchedServices = await axios.get('http://localhost:8080/api/services');
                setServices(fetchedServices.data);

            } catch (error) {
                console.error('Error:', error);
            }
        
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Create Service</h1>
            <form onSubmit={handleCreate}>
            <label>
                    ServiceId:
                    <input type="number" name="serviceId"value={formData.serviceId}onChange={handleChange}/>
                <br />
                </label>
                Area:
                <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
                    {areas.map((area) => (
                        <option key={area.areaId} value={area.areaId}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <br />
                <label>
                    Name:
                    <input type="text" name="name"value={formData.name}onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Type:
                    <input type="number" name="type"value={formData.type}onChange={handleChange}/>
                </label>
                <br/>
            
                <label>
                    Description:
                    <input type="text"name="description" value={formData.description}onChange={handleChange}/>
                </label>
                <br/>
                <label>
                Price:
                    <input type="number" name="price" value={formData.price}onChange={handleChange}/>
                </label>
                <br/>
            
                <button type="create">Create</button>
            </form>

            <h2>All services</h2>
            <div>

            {
                services.map(service=> (
                    service == null 
                        ? 
                        null 
                        :
                        <ul key={service.serviceId}>
                            <li>
                                {service.name} 
                                <button onClick={(event) => handleDelete(event, service.serviceId)}>Remove</button>
                            </li>
                        </ul>
                    )
                )
            }
            </div>
        </div>
    );
};

export default Services;



