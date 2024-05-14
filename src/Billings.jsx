import axios from "axios";
import { useState,useEffect } from 'react';
import PDFDocument from "./PDFDocument";

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
            <h2>Kaikki laskutukset</h2>
            <div>
                {
                    billingsOfReservation
                        .filter((bor, index, self) => self.findIndex(b => b[2].billingId === bor[2].billingId) === index)
                        .map(bor =>
                            {
                            const reservation = bor[0];
                            const service = bor[1];
                            const billing = bor[2];
                            return (
                                <div key={bor[2].billingId}>
                                    <p>{bor[0].customer.email}</p>
                                    <p>{new Date(bor[0].reservationStartingDate).toISOString().split('T')[0]} - {new Date(bor[0].reservationEndingDate).toISOString().split('T')[0]}</p>
                                    {
                                        bor[2].isPaid
                                        ?
                                        <p>Maksettu</p>
                                        :
                                        <p>Ei maksettu</p>
                                    }
                                    
                                    <PDFDocument billingsOfReservation={billingsOfReservation} reservation={reservation} service={service} billing={billing} />
                                </div>
                            )}
                        )
                        
                }
            </div>
        </div>
    );
};
export default Billings;
