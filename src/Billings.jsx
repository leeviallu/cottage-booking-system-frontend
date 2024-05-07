import axios from "axios";
import React, { useState, useEffect } from 'react';
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
                reservationId:{reservationId: reservationId},
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
            console.error('Error creating service:', error);
        }
        window.location.reload();
    }

    const fetchBillings = async () => {
        try {
            const fetchedBillings = await axios.get('http://localhost:8080/api/billings');
            setBillings(fetchedBillings.data);
        } catch (error) {
            console.error('Error fetching Billings:', error);
        }
    };

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
                {billings.map(billing => (
                    <li key={billing.id}>
                        <p>ReservationId: {billing.reservationId}</p>
                        <p>Sum: {billing.sum}</p>
                        <p>Is Paid: {billing.isPaid}</p>
                    </li>
                ))}
            </ul>
    </div>
    );
};
export default Billings;
