import axios from "axios";
import { useState, useEffect } from 'react';
import Service from "./Service";

const Services = () => {
    const [areas, setAreas] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        areaId: 0,
        name: '',
        description: '',
        price: 0,
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
                areaId: 0,
                name: '',
                description: '',
                price: 0,
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
        axios.get('http://localhost:8080/api/areas')
            .then(res => {
                setAreas(res.data);
                setFormData({...formData, areaId: res.data[0].areaId });
            })
            .catch(e => {
                console.error("Error while fetching areas: ",e)
            })
        axios.get('http://localhost:8080/api/services')
            .then(res => {
                setServices(res.data);
            })
            .catch(e => {
                console.error("Error while fetching services: ",e)
            })
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Luo palvelu</h1>
            <form onSubmit={handleCreate}>
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
                <label htmlFor="name">Nimi:</label>
                <br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />
                <label htmlFor="description">Kuvaus:</label>
                <br />
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                <br />
                <label htmlFor="price">Hinta:</label>
                <br />
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
                <br />
                <button type="create">Luo</button>
            </form>
            <h2>Kaikki palvelut</h2>
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
