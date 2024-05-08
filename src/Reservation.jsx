import {useState, useEffect} from 'react';
import axios from 'axios';

const Reservation = ({reservation}) => {
    const [editing, setEditing] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [cottage, setCottage] = useState([]);
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [customerResults, setCustomerResults] = useState([]);

   
    const [formData, setFormData] = useState({
        cottageId: reservation.cottage.cottageId,
        customerId: reservation.customer.customerId,
        reservationCreationDate: reservation.reservationCreationDate,
        confirmationDate: reservation.confirmationDate,
        startDate: reservation.startDate,
        endDate: reservation.endDate
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const { cottageId, customerId, reservationCreationDate, confirmationDate, startDate, endDate } = formData;
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
            "reservationDate": reservationCreationDate,
            "confirmationDate": confirmationDate,
            "reservationStartingDate": startDate,
            "reservationEndingDate": endDate
            }
        )
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

    const confirmationDate = new Date(reservation.confirmationDate);
    const formattedConfirmationDate = `${confirmationDate.getDate()}.${confirmationDate.getMonth() + 1}.${confirmationDate.getFullYear()}`;

    const creationDate = new Date(reservation.reservationDate);
    const formattedCreationDate = `${creationDate.getDate()}.${creationDate.getMonth() + 1}.${creationDate.getFullYear()}`;

    const startDate = new Date(reservation.reservationStartingDate);
    const formattedStartDate = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;

    const endDate = new Date(reservation.reservationEndingDate);
    const formattedEndDate = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;



    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCottages = await axios.get('http://localhost:8080/api/cottages');
                const fetchedCustomers = await axios.get('http://localhost:8080/api/customers');
                setCottage(fetchedCottages.data);
                setCustomer(fetchedCustomers.data);
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
       
        const filteredCustomers = customer.filter(customer =>
            customer.email == null ? null :
            customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setCustomerResults(filteredCustomers);
        if (filteredCottages.length != 0 && filteredCustomers.length != 0 && filteredCottages.length != cottage.length && filteredCustomers.length != customer.length) {
            //setFormData({...formData, cottageId: filteredCottages[0].cottageId, customerId: filteredCustomers[0].customerId})
        }
      }, [cottage, cottageSearchTerm, customer, customerSearchTerm]);
/*


    

    useEffect(() => {
        const fetchCottages = async () => {
            try {
                const fetchedCottages = await axios.get('http://localhost:8080/api/cottages');
                setCottage(fetchedCottages.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCottages();
    }, []);

    
    useEffect(() => {

        const filteredCustomers = customer.filter(customer =>
            customer.email == null ? null :
            customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCustomers);
      }, [customer, customerSearchTerm]);

      useEffect(() => {
        const filteredCottages = cottage.filter(cottage =>
            cottage.name == null ? null :
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
        );
        setSearchResults(filteredCottages);
      }, [cottage, cottageSearchTerm]);

*/


    return (
        <div>
            {
                editing
            ?
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
                    <input
                        value={cottageSearchTerm}
                        onChange={event => setCottageSearchTerm(event.target.value)} />
                    <br />
                    <select
                        id="cottageId"
                        name="cottageId"
                        value={formData.cottageId}
                        onChange={handleChange}
                    >
                        {searchResults.map((cottage) => 
                        {
                            return(
                            <option
                                key={cottage.cottageId}
                                value={cottage.cottageId}>
                                    {cottage.name}
                            </option>
                        )}).slice(0,5)}
                    </select>
                    <br />
                
                
                <label htmlFor="varausLuontiPvm">Varauksen luontipäivä:</label>
                    <br />
                    <input
                        type="date"
                        name="reservationCreationDate"
                        value={formData.reservationCreationDate}
                        onChange={handleChange}
                    />
                    <br />
                
                <label htmlFor="varausVahvistusPvm">Varauksen vahvistuspäivä:</label>
                    <br />
                    <input
                        type="date"
                        name="confirmationDate"
                        value={formData.confirmationDate}
                        onChange={handleChange}
                    />
                    <br />
               
                
                <label htmlFor="varausAlkuPvm">Varauksen alkamispäivä:</label>
                    <br />
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <br />


                <label htmlFor="varausPäättyyPvm">Varauksen päättymispäivä:</label>
                    <br />
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                    <br />

                <br />

                <button type="button" onClick={() => setEditing(!editing)}>
                Undo                        
                </button>

                <br />
                <button type="luo">Luo</button>
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
                        <b>Varauksen luontipäivä: </b> {formattedCreationDate}
                        <br />
                        <b>Varauksen vahvistuspäivä: </b> {formattedConfirmationDate}
                        <br />
                        <b>Varauksen alkamispäivä: </b> {formattedStartDate}
                        <br />
                        <b>Varauksen päättymispäivä: </b> {formattedEndDate}
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