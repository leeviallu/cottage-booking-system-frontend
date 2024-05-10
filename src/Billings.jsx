import axios from "axios";
import { useState,useEffect } from 'react';
import Billing from "./Billing";
const Billings=()=>{
    const [billingsOfReservation, setBillingsOfReservation] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/billings/reservation?confirmationDate=${new Date().toISOString().split('T')[0]}`)
            .then(res => {
                setBillingsOfReservation(res.data);
            })
            .catch(e => {
                console.error('Error fetching billingsOfReservation: ',e);
            })
    }, []);

    
    return (
        <div>
            <h2>All billings</h2>
            <div>
                {
                    billingsOfReservation
                        .filter((bor, index, self) => self.findIndex(b => b[1].billingId === bor[1].billingId) === index)
                        .map(bor =>
                            <Billing key={bor[1].billingId} bor={bor} billingsOfReservation={billingsOfReservation} />
                        )
                }
            </div>
        </div>
    );
};
export default Billings;
