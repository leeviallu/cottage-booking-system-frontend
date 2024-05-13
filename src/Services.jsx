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
            console.error('Virhe palvelun luomisessa:', error);
        }
        window.location.reload();
    };


    const fetchServices = async () => {
        try {
            const fetchedServices = await axios.get('http://localhost:8080/api/services');
            setServices(fetchedServices.data);
        } catch (error) {
            console.error('Virhe palveluiden hakemisessa:', error);
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
            <h1>Luo palvelu</h1>
            <form onSubmit={handleCreate}>
                <label>
                    Alue:
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
                    Nimi:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Kuvaus:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Hinta:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>
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
