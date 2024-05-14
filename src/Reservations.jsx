import { useState, useEffect } from 'react';
import axios from 'axios';
import Reservation from './Reservation';


const Reservations = () => {
  
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [customerResults, setCustomerResults] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [cottages, setCottages] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({
        cottageId: 0,
        customerId: 0,
        reservationDate: new Date().toISOString().split('T')[0],
        confirmationDate: '',
        reservationStartingDate: '',
        reservationEndingDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        const { cottageId, customerId, reservationDate, confirmationDate, reservationStartingDate, reservationEndingDate } = formData;
        event.preventDefault();
        axios.post('http://localhost:8080/api/reservations',
            {
                "customer": {
                        "customerId": customerId,
                    },
                "cottage": {
                        "cottageId": cottageId,
                    },
                "reservationDate": reservationDate,
                "confirmationDate": confirmationDate,
                "reservationStartingDate": reservationStartingDate,
                "reservationEndingDate": reservationEndingDate
            }
        ).then(() => {
            setCottageSearchTerm("")
            setCustomerSearchTerm("")
            setFormData({
                cottageId: cottages[0].cottageId,
                customerId: customers[0].customerId,
                reservationDate: new Date().toISOString().split('T')[0],
                confirmationDate: new Date().toISOString().split('T')[0],
                reservationStartingDate: new Date().toISOString().split('T')[0],
                reservationEndingDate: new Date().toISOString().split('T')[0]
            })
            window.location.reload();
        })
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/cottages')
            .then(res => {
                setCottages(res.data);
                axios.get('http://localhost:8080/api/customers')
                    .then(res => {
                        setCustomers(res.data);
                        if (cottages[0] && customers[0]) {
                            setFormData({...formData, cottageId: cottages[0].cottageId, customerId: customers[0].customerId})
                        }
                    }).catch(e => {
                        console.error('Error fetching customers: ', e)
                    })
            }).catch(e => {
                console.error('Error fetching cottages: ', e)
            })
        axios.get('http://localhost:8080/api/reservations')
            .then(res => {
                setReservations(res.data);
            }).catch(e => {
                console.error('Error fetching reservations: ', e)
            })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filteredCottages = cottages.filter(cottage =>
            cottage.name == null ? null :
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCottages);
        if (filteredCottages.length != 0) {
            setFormData({...formData, cottageId: filteredCottages[0].cottageId})
        }

        const filteredCustomers = customers.filter(customer =>
            customer.email == null ? null :
            customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setCustomerResults(filteredCustomers);
        if (filteredCustomers.length != 0) {
            setFormData({...formData, customerId: filteredCustomers[0].customerId})
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cottages, cottageSearchTerm, customers, customerSearchTerm]);


    return (
        <div className='container'>
            <h1>Luo varaus</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="customerId">Etsi asiakasta sähköpostiosoitteella:</label>
                <br />
                <input type="text" value={customerSearchTerm} onChange={event => setCustomerSearchTerm(event.target.value)} />
                <br />
                
                <select id="customerId" name="customerId" value={formData.customerId} onChange={handleChange}>
                    {customerResults.map((customer) => (
                        <option key={customer.customerId} value={customer.customerId}>
                            {customer.email}
                        </option>
                    ))}
                </select>
                <br />


                <label htmlFor="cottageId">Etsi mökkiä nimellä:</label>
                <br />
                <input value={cottageSearchTerm} onChange={event => setCottageSearchTerm(event.target.value)} />
                <br />
                <select id="cottageId" name="cottageId" value={formData.cottageId} onChange={handleChange}>
                    {searchResults.map((cottage) => (
                        <option key={cottage.cottageId} value={cottage.cottageId}>
                            {cottage.name}
                        </option>
                    ))}
                </select>
                <br />
                
                
                <label htmlFor="reservationDate">Varauksen luontipäivä:</label>
                <br />
                <input type="date" id="reservationDate" name="reservationDate" value={formData.reservationDate} onChange={handleChange} />
                <br />
            
                <label htmlFor="confirmationDate">Varauksen vahvistuspäivä:</label>
                <br />
                <input type="date" id="confirmationDate" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
                <br />
               
                
                <label htmlFor="reservationStartingDate">Varauksen alkamispäivä:</label>
                <br />
                <input type="date" id="reservationStartingDate" name="reservationStartingDate" value={formData.reservationStartingDate} onChange={handleChange} />
                <br />


                <label htmlFor="reservationEndingDate">Varauksen päättymispäivä:</label>
                <br />
                <input type="date" id="reservationEndingDate" name="reservationEndingDate" value={formData.reservationEndingDate} onChange={handleChange} />
                <br />

                <br />
                <button type="submit">Luo</button>
                <br />
                <br />


            </form>
            
            <h1>Luodut varaukset</h1>
            <div>
                {
                    reservations.map(reservation =>
                        <Reservation key={reservation.reservationId} reservation={reservation} />
                    )
                }
            </div>
        </div>
    );
}

export default Reservations;
