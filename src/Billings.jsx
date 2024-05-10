import axios from "axios";
import { useState,useEffect } from 'react';
import Billing from "./Billing";
const Billings=()=>{
    const [billings, setBillings] = useState([]);
    const[formData, setFormData]=useState({
        reservationId: '',
        sum:'',
        isPaid:''
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleCreate= async (e)=>{
        e.preventDefault();
        const {reservationId, sum, isPaid} = formData;
        try {
            await axios.post('http://localhost:8080/api/billings', {
                reservationId:reservationId,
                sum:sum,
                isPaid:isPaid,
            });
            
            setFormData({
                reservationId: '',
                sum: '',
                isPaid: '',
            });
            fetchBillings();
        } catch (error) {
            console.error('Error creating billing:', error);
        }
        window.location.reload();
    }

    const fetchBillings = async () => {
        try {
            const fetchedBillings = await axios.get('http://localhost:8080/api/billings');
            setBillings(fetchedBillings.data);
            console.log(fetchBillings.data);
        } catch (error) {
            console.error('Error fetching Billings:', error);
        }
    };
    useEffect(() => {
        const fetchBillings = async () => {
            try {
                const fetchedBillings = await axios.get('http://localhost:8080/api/billings');
                setBillings(fetchedBillings.data);
                console.log(fetchBillings.data);
            } catch (error) {
                console.error('Error fetching Billings:', error);
            }
        }
        fetchBillings();
    }, []);

    
    return (
        <div>
            <h1>Create Billing</h1>
            <form onSubmit={handleCreate}>
                <br />
                <label>
                    ReservationId:
                    <input type="number" name="reservationId" value={formData.reservationId} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Sum:
                    <input type="number" name="sum" value={formData.sum} onChange={handleChange} />
                </label>
                <br />
                <label>
                    is Paid:
                    <input type="text " name="isPaid" value={formData.isPaid} onChange={handleChange} />
                </label>
                <br />
                <button type="create">Create</button>
            </form>
            <h2>All billings</h2>
            <ul>
            {
                    billings.map(billing=>
                        <Billing key={billing.billingId} billing={billing}/>
                    )
                }
            </ul>
    </div>
    );
};
export default Billings;
