import axios from "axios";
import { useState, useEffect } from 'react';
import Service from "./Service";

const Services = () => {
    const [areas, setAreas] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceSearchTerm, setServiceSearchTerm] = useState('');
    const [serviceSearchResults, setServiceSearchResults] = useState([]);
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
        axios.post('http://localhost:8080/api/services', {
            area: { areaId: areaId },
            name: name,
            description: description,
            price: price,
            })
            .then(() => {
                setFormData({
                    areaId: 0,
                    name: '',
                    description: '',
                    price: 0,
                });
                axios.get('http://localhost:8080/api/services')
                    .then(res => {
                        setServices(res.data);
                        window.location.reload();
                    })
                    .catch(e => {
                        console.error('Error fetching services:', e);
                    })
            })
            .catch(e => {
                console.error('Error posting services:', e);
            })
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
    useEffect(() => {
        let filteredServices;
        if (areaSearchTerm == "") {
            filteredServices = services;
        } else {
        filteredServices = services.filter(service =>
            service.area.name.toLowerCase().includes(areaSearchTerm.toLowerCase()) 
        );
    }
        setAreaSearchResults(filteredServices);
    }, [areas, areaSearchTerm]);


    useEffect(() => {
        const filteredServices = services.filter(service =>
            service.area.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) 
        );
        setServiceSearchResults(filteredServices);
    }, [services, serviceSearchTerm]);

    return (
        <div className="container">
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
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Nimi ei voi olla tyhjä')} 
                    onInput={e => e.target.setCustomValidity('')}
                    required 
                />
                
                <br />
                <label htmlFor="description">Kuvaus:</label>
                <br />
                <input type="text" name="description" value={formData.description} onChange={handleChange} 
                onInvalid={e => e.target.setCustomValidity('Kuvaus ei voi olla tyhjä')} 
                onInput={e => e.target.setCustomValidity('')}
                required/>
                <br />
                <label htmlFor="price">Hinta:</label>
                <br />
                <input type="number" name="price" value={formData.price} onChange={handleChange} 
                 onInvalid={e => e.target.setCustomValidity('Hinta ei voi olla 0')} 
                 onInput={e => e.target.setCustomValidity('')} 
                 min="1" 
                 max="1000000000" 
                 required />
                <br />
                <button type="create">Luo</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <h2>Hae palveluita alueen nimellä:</h2>
            <input id="servicesearchterm" value={serviceSearchTerm} onChange={event => setServiceSearchTerm(event.target.value)} />
            <br />
            <div>
                    {
                        serviceSearchResults.map(service=>
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