import axios from "axios";
import { useState,useEffect } from 'react';
import Billing from "./Billing";
import PDFDocument from "./PDFDocument";

const Billings=()=>{
    const [billingsOfReservation, setBillingsOfReservation] = useState([]);
    const [showPDF, setShowPDF] = useState(false);
    const [selectedBillingId, setSelectedBillingId] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/billings/reservation?confirmationDate=${new Date().toISOString().split('T')[0]}`)
            .then(res => {
                setBillingsOfReservation(res.data);
            })
            .catch(e => {
                console.error('Error fetching billingsOfReservation: ',e);
            })
    }, []);

    const handleShowPDF = (billingId) => {
        setSelectedBillingId(billingId);
        setShowPDF(true);
    };
    const handleClosePDF = () => {
        setShowPDF(false);
    };
    return (
        <div>
            <h2>Kaikki laskutukset</h2>
            <div>
                {
                    billingsOfReservation
                        .filter((bor, index, self) => self.findIndex(b => b[1].billingId === bor[1].billingId) === index)
                        .map(bor =>
                            <div key={bor[1].billingId}>
                            <Billing bor={bor} billingsOfReservation={billingsOfReservation} />
                                {showPDF && selectedBillingId === bor[1].billingId && <PDFDocument bor={bor} billingsOfReservation={billingsOfReservation}/>}
                                <button type="button" onClick={() => handleShowPDF(bor[1].billingId)}>Näytä PDF</button>
                                {showPDF && selectedBillingId === bor[1].billingId && <button type="button" onClick={handleClosePDF}>Sulje</button>}

                            <br />
                            <br />
                            <br />
                        </div>

                        )
                        
                }
            </div>
        </div>
    );
};
export default Billings;
