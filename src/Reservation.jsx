
const Reservation = ({reservation}) => {
    /*
    const [customer, setCustomer] = useState([]);
    const [cottage, setCottage] = useState([]);

    
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

/*
    const [editing, setEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        cottageId: reservation.cottageId,
        customerId: reservation.customerId,
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
        try {
            axios.delete(`http://localhost:8080/api/reservations/${id}`)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
        window.location.reload();
    }
*/
    const confirmationDate = new Date(reservation.confirmationDate);
    const formattedConfirmationDate = `${confirmationDate.getDate()}.${confirmationDate.getMonth() + 1}.${confirmationDate.getFullYear()}`;

    const creationDate = new Date(reservation.reservationDate);
    const formattedCreationDate = `${creationDate.getDate()}.${creationDate.getMonth() + 1}.${creationDate.getFullYear()}`;

    const startDate = new Date(reservation.reservationStartingDate);
    const formattedStartDate = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`;

    const endDate = new Date(reservation.reservationEndingDate);
    const formattedEndDate = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;

/*


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const fetchedCustomers = await axios.get('http://localhost:8080/api/customers');
                setCustomer(fetchedCustomers.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCustomers();
    }, []);

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
            
            <p>Varaus ID: {reservation.reservationId}</p>
            <p>Mökki ID: {reservation.cottage.cottageId}</p>
            <p>Asiakkaan ID: {reservation.customer.customerId}</p>
            <p>Varauksen luontipäivä: {formattedCreationDate}</p>
            <p>Varauksen vahvistuspäivä: {formattedConfirmationDate}</p>
            <p>Varauksen alkamispäivä: {formattedStartDate}</p>
            <p>Varauksen päättymispäivä: {formattedEndDate}</p>
            

            <br />
            <br />
        </div>
            
    );
};

export default Reservation;