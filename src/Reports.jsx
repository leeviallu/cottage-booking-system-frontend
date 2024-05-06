import axios from "axios";
import { useEffect, useState } from "react";

const Reports = () => {
    const [services, setServices] = useState([]);
    let total = 0;

    useEffect(() => {
        const id = 3;
        const startDate = "2010-02-02";
        const endDate = "2023-04-04";

        axios.get(`http://localhost:8080/api/reservations/services/${id}?startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                setServices(res.data);
            })
        
    }, [])

    return (
        <div>
            <h1>Reports</h1>
            
                {services.map(item => {
                    total += item.count * item.service.price;
                    return (
                        <div key={item.service.serviceId}>
                            <h3>{item.service.name}</h3>
                            <p>{item.service.description}</p>
                            <p>Price: {item.service.price} €</p>
                            <p>Total: {item.count * item.service.price} €</p>
                            <br/>
                            <br/>
                        </div>
                    )
                })}

                <h3>Area Total: {total} €</h3>
        </div>
    );
};

export default Reports;