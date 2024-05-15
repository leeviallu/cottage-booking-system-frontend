import axios from 'axios';
import { useState } from 'react';
import PDFDocument from './PDFDocument';

const Billings=()=>{
    const [billingsOfReservation, setBillingsOfReservation] = useState([]);
    const [date, setDate] = useState('');
    const [dateShown, setDateShown] = useState('');

    const searchBillings = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8080/api/billings/reservation?confirmationDate=${date}`)
            .then(res => {
                setBillingsOfReservation(res.data);
                setDateShown(date);
            })
            .catch(e => {
                console.error('Error fetching billingsOfReservation: ',e);
            });
    };



    return (
        <div className="container">
            <h2>Laskut</h2>
            <form onSubmit={searchBillings}>
                <label htmlFor="date">Varauksen vahvistuspäivä:</label>
                <br />
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    onInvalid={e => e.target.setCustomValidity('Valitse vahvistuspäivämäärä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                />
                <br />
                <button className='btn' type="submit">Hae</button>
            </form>

            <br />
            <div>
                {
                    billingsOfReservation[0] && <h2>Vahvistuspäivä ennen {new Date(dateShown).getDate() + '.' + (new Date(dateShown).getMonth() + 1) + '.' + new Date(dateShown).getFullYear()}</h2>

                }


                {
                    billingsOfReservation
                        .filter((bor, index, self) => self.findIndex(b => b[2].billingId === bor[2].billingId) === index)
                        .map(bor => {
                            const reservation = bor[0];
                            const service = bor[1];
                            const billing = bor[2];
                            return (
                                <div className="item-container" key={bor[2].billingId}>
                                    <p>{bor[0].customer.email}</p>
                                    <p>{new Date(bor[0].reservationStartingDate).getDate() + '.' + (new Date(bor[0].reservationStartingDate).getMonth() + 1) + '.' + new Date(reservation.reservationStartingDate).getFullYear()}</p>
                                    {
                                        bor[2].isPaid
                                            ?
                                            <p>Maksettu</p>
                                            :
                                            <p>Ei maksettu</p>
                                    }

                                    <PDFDocument billingsOfReservation={billingsOfReservation} reservation={reservation} service={service} billing={billing} />
                                </div>
                            );
                        }
                        )

                }
            </div>
        </div>
    );
};
export default Billings;
