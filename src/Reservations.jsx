import { useState, useEffect } from 'react';
import axios from 'axios';

const Reservations = () => {
  
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [customerResults, setCustomerResults] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [cottages, setCottages] = useState([]);
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
        console.log("hei", formData);

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
                setCottages(fetchedCottages.data);
                setCustomers(fetchedCustomers.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredCottages = cottages.filter(cottages =>
            cottages.name == null ? null :
            cottages.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCottages);

        const filteredCustomers = customers.filter(customers =>
            customers.email == null ? null :
            customers.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setCustomerResults(filteredCustomers);
      }, [cottages, cottageSearchTerm, customers, customerSearchTerm]);

    



    return (
        <div>
            <h1>Make a Reservation</h1>
            <form onSubmit={handleSubmit}>
                <label>
                <br />
                    Etsi asiakasta sähköpostiosoitteella:
                    <br />
                    <input type="text" value={customerSearchTerm} onChange={event => setCustomerSearchTerm(event.target.value)} />
                    <br />
                    <select name="customerId" value={formData.customerId} onChange={handleChange}>
                    {customerResults.map((customer) => (
                        <option key={customer.customerId} value={customer.customerId}>
                            {customer.email}
                        </option>
                    )).slice(0,5)}
                    </select>
                </label>
                <br />
                <label>
                <br />
                    Etsi mökkiä nimellä: 
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
                    
                </label>
                <br />
                <label>
                <br />
                    Varauksen luontipäivä:
                    <br />
                    <input type="date" name="reservationCreationDate" value={formData.reservationCreationDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                <br />
                    Varauksen vahvistuspäivä:
                    <br />
                    <input type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                <br />
                    Varauksen alkamispäivä:
                    <br />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                <br />
                    Varauksen päättymispäivä: 
                    <br />
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </label>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Reservations;
