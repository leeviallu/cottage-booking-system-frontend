import { useState, useEffect } from 'react';
import axios from 'axios';
import Reservation from './Reservation';


const Reservations = () => {
  
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [customerResults, setCustomerResults] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [cottage, setCottage] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({
        cottageId: 0,
        customerId: 0,
        reservationCreationDate: '',
        confirmationDate: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {

        const { cottageId, customerId, reservationCreationDate, confirmationDate, startDate, endDate } = formData;
        event.preventDefault();
        axios.post('http://localhost:8080/api/reservations',
            {
                "customer": {
                        "customerId": customerId,
                    },
                "cottage": {
                        "cottageId": cottageId,
                    },
                "reservationDate": reservationCreationDate,
                "confirmationDate": confirmationDate,
                "reservationStartingDate": startDate,
                "reservationEndingDate": endDate
            }
        )
        setFormData({
            cottageId: 0,
            customerId: 0,
            reservationCreationDate: '',
            confirmationDate: '',
            startDate: '',
            endDate: ''
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCottages = await axios.get('http://localhost:8080/api/cottages');
                const fetchedCustomers = await axios.get('http://localhost:8080/api/customers');
                const fetchedReservations = await axios.get('http://localhost:8080/api/reservations');
                setCottage(fetchedCottages.data);
                setCustomer(fetchedCustomers.data);
                setReservations(fetchedReservations.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredCottages = cottage.filter(cottage =>
            cottage.name == null ? null :
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCottages);
        if (filteredCottages.length != 0) {
            setFormData({...formData, cottageId: filteredCottages[0].cottageId})
        }

        const filteredCustomers = customer.filter(customer =>
            customer.email == null ? null :
            customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setCustomerResults(filteredCustomers);
        if (filteredCustomers.length != 0) {
            setFormData({...formData, customerId: filteredCustomers[0].customerId})
        }
      }, [cottage, cottageSearchTerm, customer, customerSearchTerm]);

    



    return (
        <div>
            <h1>Luo varaus</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="sposti">Etsi asiakasta sähköpostiosoitteella:</label>
                    <br />
                    <input type="text" value={customerSearchTerm} onChange={event => setCustomerSearchTerm(event.target.value)} />
                    <br />
                    
                    <select id="customerId" name="customerId" value={formData.customerId} onChange={handleChange}>
                        {customerResults.map((customer) => (
                            <option key={customer.customerId} value={customer.customerId}>
                                {customer.email}
                            </option>
                        )).slice(0,8)}
                    </select>
                    <br />


                <label htmlFor="mokki">Etsi mökkiä nimellä:</label>
                    <br />
                    <input value={cottageSearchTerm} onChange={event => setCottageSearchTerm(event.target.value)} />
                    <br />
                    <select id="cottageId" name="cottageId" value={formData.cottageId} onChange={handleChange}>
                        {searchResults.map((cottage) => (
                            <option key={cottage.cottageId} value={cottage.cottageId}>
                                {cottage.name}
                            </option>
                        )).slice(0,5)}
                    </select>
                    <br />
                
                
                <label htmlFor="varausLuontiPvm">Varauksen luontipäivä:</label>
                    <br />
                    <input type="date" name="reservationCreationDate" value={formData.reservationCreationDate} onChange={handleChange} />
                    <br />
                
                <label htmlFor="varausVahvistusPvm">Varauksen vahvistuspäivä:</label>
                    <br />
                    <input type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
                    <br />
               
                
                <label htmlFor="varausAlkuPvm">Varauksen alkamispäivä:</label>
                    <br />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    <br />


                <label htmlFor="varausPäättyyPvm">Varauksen päättymispäivä:</label>
                    <br />
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                    <br />

                <br />
                <button type="luo">Luo</button>
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
