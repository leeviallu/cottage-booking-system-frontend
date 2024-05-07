import axios from "axios";
import { useEffect, useState } from "react";

const Reports = () => {
    const [areas, setAreas] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [services, setServices] = useState([]);
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
                console.log(res.data)
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
                console.error('Error fetching areas:', err);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Reports</h1>
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
                <label htmlFor="startDate">Start Date:</label>
                <br />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <br />
                <label htmlFor="endDate">End Date:</label>
                <br />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                <br />

                <button type="submit">Submit</button>
            </form>
            <br />
            <br />

            {
                services[0] ? 
                <div>
                    <h2>{services[0].service.area.name} service report between {startDate} and {endDate}</h2>

                    {services.map(item => {
                        total += item.count * item.service.price;
                        return (
                            <div key={item.service.serviceId}>
                                <h3>{item.service.name}</h3>
                                <p>{item.service.description}</p>
                                <p>Sold services: {item.count}</p>
                                <p>Total: {item.count * item.service.price} €</p>
                                <br/>
                            </div>
                        )
                    })}
    
                    <h3>Area Total: {total} €</h3>
                </div>

                
                :
                null
            }
        
            
        </div>
    );
};

export default Reports;