import { useState, useEffect } from 'react';
import axios from 'axios';

const Reservations = () => {
  
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [cottages, setCottage] = useState([]);
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
        console.log(cottageId, customerId, reservationCreationDate, confirmationDate, startDate, endDate);
        console.log(cottageId, );
        console.log( customerId, );
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
                console.log(fetchedCottages.data);
                setCottage(fetchedCottages.data);
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
      }, [cottages, cottageSearchTerm]);


    return (
        <div>
            <h1>Make a Reservation</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer Id: 
                    <input type="number" name="customerId" value={formData.customerId} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Search cottages by name: 
                    <input value={cottageSearchTerm} onChange={event => setCottageSearchTerm(event.target.value)} />
                    <select id="cottageId" name="cottageId" value={formData.cottageId} onChange={handleChange}>
                    {searchResults.map((cottages) => (
                        <option key={cottages.cottageId} value={cottages.cottageId}>
                            {cottages.name}
                        </option>
                    )).slice(0,5)}
                    </select>
                    
                </label>
                <br />
                <label>
                    Reservation Creation Date: 
                    <input type="date" name="reservationCreationDate" value={formData.reservationCreationDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Confirmation Date: 
                    <input type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Start Date: 
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    End Date: 
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Reservations;
