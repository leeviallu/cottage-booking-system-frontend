import axios from "axios";
import { useEffect, useState } from "react";

const ServiceReport = () => {
    const [areas, setAreas] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [services, setServices] = useState([]);
    const [servicesOfReservation, setServicesOfReservation] = useState([]);
    const [formData, setFormData] = useState({
        areaId: 0,
        startDate: '',
        endDate: ''
    });
    
    let total = 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStartDate(formData.startDate);
        setEndDate(formData.endDate);
        axios.get(`http://localhost:8080/api/reservations/services/${formData.areaId}?startDate=${formData.startDate}&endDate=${formData.endDate}`)
            .then(res => {
                setServicesOfReservation(res.data);
            })
        
        axios.get(`http://localhost:8080/api/services/area/${formData.areaId}`)
            .then(res => {
                setServices(res.data);
            })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/areas')
            .then((res) => {
                setAreas(res.data);
                setFormData({...formData, areaId: res.data[0].areaId})
            })
            .catch((err) => {
                console.error('Virhe alueiden hakemisessa:', err);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
        <h1>Palveluiden raportit</h1>
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
                <label htmlFor="startDate">Alkamispäivä:</label>
                <br />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <br />
                <label htmlFor="endDate">Päättymispäivä:</label>
                <br />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                <br />

                <button type="submit">Luo</button>
            </form>
            <br />
            <br />

            {
                services[0] && servicesOfReservation[0] ? 
                <div>
                    <h2>{services[0].area.name} service report between {startDate} and {endDate}</h2>

                    {services.map(service => {
                        let serviceTotal = 0;
                        let serviceCount = 0
                        servicesOfReservation.map(sor => {
                            if(sor.service.serviceId == service.serviceId) {
                                serviceTotal += sor.count * service.price;
                                serviceCount += sor.count;
                            }
                        })
                        total += serviceTotal;
                        return (
                            <div key={service.serviceId}>
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <p>Myydyt palvelut: {serviceCount}</p>
                                <p>Yhteensä: {serviceTotal}</p>
                                <br/>
                            </div>
                        )
                    })}
    
                    <h3>Alueen yhteenveto: {total} €</h3>
                </div>

                
                :
                null
            }
        
            
        </div>
    );
};

export default ServiceReport;