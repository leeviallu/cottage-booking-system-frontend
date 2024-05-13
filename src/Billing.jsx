import { useEffect, useState } from "react";

const Billing = ({bor, billingsOfReservation}) => {
    const [billingServices, setBillingServices] = useState([]);
    const sor = bor[0];
    const billing = bor[1];
    

    useEffect(() => {
        const updatedBillingServices = billingsOfReservation
            .filter(bor => bor[1].billingId === billing.billingId)
            .map(bor => bor[0].service);
    
        setBillingServices(updatedBillingServices);
    }, [billingsOfReservation, billing.billingId]);
    

    return (
        <div key={billing.billingId}>
            <p>{sor.reservation.customer.firstname} {sor.reservation.customer.lastname}</p>
            <p>{sor.reservation.customer.email}</p>
            <p>{sor.reservation.customer.phonenumber}</p>
            <p>{sor.reservation.cottage.name}</p>
            <p>EI TOIMI {billing.sum}</p>
            
            {
                billingServices.map(service => (
                    <div key={service.serviceId}>
                        <p><b>Service: </b>{service.name}</p>
                        <p><b>Price: </b>{service.price}</p>
                    </div>
                ))
            }
            <p>Reservation between {new Date(sor.reservation.reservationStartingDate).toISOString().split('T')[0]} and {new Date(sor.reservation.reservationEndingDate).toISOString().split('T')[0]}</p>
            
            {
                billing.isPaid
                ?
                <h3>maksettu</h3>
                :
                <h3>ei maksettu</h3>

            }

         
        </div>
    )
};
export default Billing;