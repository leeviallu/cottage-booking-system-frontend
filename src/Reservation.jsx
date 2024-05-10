import {useState, useEffect} from 'react';
import axios from 'axios';

const Reservation = ({reservation}) => {
    const [editing, setEditing] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [cottages, setCottages] = useState([]);
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [customerResults, setCustomerResults] = useState([]);
   
    const [formData, setFormData] = useState({
        cottageId: reservation.cottage.cottageId,
        customerId: reservation.customer.customerId,
        reservationDate: new Date(reservation.reservationDate).toISOString().split('T')[0],
        confirmationDate: new Date(reservation.confirmationDate).toISOString().split('T')[0],
        reservationStartingDate: new Date(reservation.reservationStartingDate).toISOString().split('T')[0],
        reservationEndingDate: new Date(reservation.reservationEndingDate).toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (e) => {
        const { cottageId, customerId, reservationDate, confirmationDate, reservationStartingDate, reservationEndingDate } = formData;
        const id = reservation.reservationId;
        e.preventDefault();        
        axios.put(`http://localhost:8080/api/reservations/${id}`,
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
            })
            .then(() => {
                setCottageSearchTerm("")
                setCustomerSearchTerm("")
                setEditing(!editing)
                window.location.reload();
            }).catch(err => {
                console.error('Error while editing cottage:', err);
            })
    };

    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`http://localhost:8080/api/reservations/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Error while deleting cottage:', err);
            })
    }


    useEffect(() => {
        axios.get('http://localhost:8080/api/cottages')
            .then(res => {
                setCottages(res.data);
            }).catch(e => {
                console.error('Error fetching cottages: ', e)
            })
        axios.get('http://localhost:8080/api/customers')
            .then(res => {
                setCustomers(res.data);
            }).catch(e => {
                console.error('Error fetching customers: ', e)
            })
    }, []);

    useEffect(() => {
        const filteredCottages = cottages.filter(cottage =>
            cottage.name == null ? null :
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCottages);
       
        const filteredCustomers = customers.filter(customer =>
            customer.email == null ? null :
            customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setCustomerResults(filteredCustomers);
        if (filteredCottages.length != 0 && filteredCustomers.length != 0 && filteredCottages.length != cottages.length && filteredCustomers.length != customers.length) {
            setFormData({...formData, cottageId: filteredCottages[0].cottageId, customerId: filteredCustomers[0].customerId})
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cottages, cottageSearchTerm, customers, customerSearchTerm]);


    return (
        <div>
            {
                editing
                ?
                <form onSubmit={handleEdit}>
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
                    <button type="button" onClick={() => setEditing(!editing)}>Peruuta</button>
                    <button type="submit">Luo</button>
                    <br />
                    <br />


                </form>     
                :
                <div key={reservation.reservationId}>
                    <p>
                        <b>Mökin nimi: </b> {reservation.cottage.name}
                        <br />
                        <b>Asiakkaan nimi: </b> {reservation.customer.firstname} {reservation.customer.lastname}
                        <br />
                        <b>Varauksen luontipäivä: </b> {new Date(reservation.reservationDate).toISOString().split('T')[0]}
                        <br />
                        <b>Varauksen vahvistuspäivä: </b> {new Date(reservation.confirmationDate).toISOString().split('T')[0]}
                        <br />
                        <b>Varauksen alkamispäivä: </b> {new Date(reservation.reservationStartingDate).toISOString().split('T')[0]}
                        <br />
                        <b>Varauksen päättymispäivä: </b> {new Date(reservation.reservationEndingDate).toISOString().split('T')[0]}
                        <br />
                    </p>

                    <button onClick={() => setEditing(!editing)}>Muokkaa</button>
                    
                    <button onClick={(event) => handleDelete(event, reservation.reservationId)}>Poista</button>
                    <br />
                    <br />
                    <br />
                </div>
            }
            
           
        </div>
            
    );
};

export default Reservation;