import axios from "axios";
import { useState,useEffect } from 'react';
import PDFDocument from "./PDFDocument";

const Billings=()=>{
    const [billingsOfReservation, setBillingsOfReservation] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/billings/reservation?confirmationDate=${new Date().toISOString().split('T')[0]}`)
            .then(res => {
                setBillingsOfReservation(res.data);
                console.log(res.data)
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
                            <PDFDocument key={bor[2].billingId} bor={bor} billingsOfReservation={billingsOfReservation}/>
                        )
                        
                }
            </div>
        </div>
    );
};
export default Billings;
