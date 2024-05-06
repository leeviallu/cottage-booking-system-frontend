import axios from "axios";
import { useState } from 'react';
const Billings=()=>{
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
            await axios.post('http://localhost:8080/api/billing', {
                reservationId:{reservationId: reservationId
                },
                sum:sum,
                isPaid:isPaid,
            });
            setFormData({
                reservationId: '',
                sum: '',
                isPaid: '',
            });
        } catch (error) {
            console.error('Error creating service:', error);
        }
        window.location.reload();
    }

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
                    <input type="text" name="isPaid" value={formData.isPaid} onChange={handleChange} />
                </label>
                <br />
                <button type="create">Create</button>
            </form>
            <h2>All billings</h2>
        <div>
        </div>
    </div>
    );
};
export default Billings;
