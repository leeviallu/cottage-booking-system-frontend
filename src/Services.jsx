import axios from "axios";
import { useState, useEffect } from 'react';
import Service from "./Service";

const Services = () => {
    const [areas, setAreas] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        areaId: '',
        name: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { areaId, name, description, price } = formData;
        try {
            await axios.post('http://localhost:8080/api/services', {
                area: { areaId: areaId },
                name: name,
                description: description,
                price: price,
            });
            setFormData({
                areaId: '',
                name: '',
                description: '',
                price: '',
            });
            fetchServices();
        } catch (error) {
            console.error('Error creating service:', error);
        }
        window.location.reload();
    };


    const fetchServices = async () => {
        try {
            const fetchedServices = await axios.get('http://localhost:8080/api/services');
            setServices(fetchedServices.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
                setAreas(fetchedAreas.data);
                setFormData({ areaId: fetchedAreas.data[0].areaId });
                fetchServices();
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
                    Area:
                    <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
                        {areas.map((area) => (
                            <option key={area.areaId} value={area.areaId}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <br />
                <button type="create">Create</button>
            </form>
            <h2>All services</h2>
        <div>
                {
                    services.map(service=>
                        service.name !=null?
                        <Service key={service.serviceId} service={service}/>
                        :
                        null
                    )
                }
        </div>
    </div>
    );
};

export default Services;
