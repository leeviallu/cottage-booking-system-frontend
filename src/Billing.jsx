
import axios from "axios";
import { useState, useEffect } from 'react';

const Billing = ({billing}) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        reservationId: billing.reservationId,
        sum: billing.sum,
        isPaid: billing.isPaid
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
        axios.delete(`http://localhost:8080/api/billings/${id}`);
        
    } catch (error) {
        console.error('Error deleting billing:', error);
    }
    window.location.reload();
};

const handleEdit = async (event, id) => {
    const {reservationId, sum, isPaid} = formData;
    const billingId=billing.billingId
    event.preventDefault();
    console.log(formData)
    axios.put(`http://localhost:8080/api/billings/${billingId}`, 
    {

        reservationId:reservationId,
                sum:sum,
                isPaid:isPaid,

    }
    )
    window.location.reload();
};
return(<div>
    {
        editing
    ?
    <form onSubmit={handleEdit}>
    
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
        isPaid:
        <input type="text " name="isPaid" value={formData.isPaid} onChange={handleChange} />
        </label>
        <br/>              
        <button type="submit">Submit</button>
        <br/>
        <br/>
        <button onClick={() => setEditing(!editing)}>Edit</button>

        <button onClick={(event) => handleDelete(event, billing.billingId)}>Remove</button>
        <br/>
    </form>

    :
    <div key={billing.billingId}>
        <p>
        <b>ReservationId:</b> {billing.reservationId}
        <br/>
        <b>Sum:</b> {billing.sum}
        <br/>            
        <b>isPaid:</b> {billing.isPaid}
        <br/>
        </p>
        <button onClick={() => setEditing(!editing)}>Edit</button>
        <button onClick={(event) => handleDelete(event, billing.billingId)}>Remove</button>
        <br/>
        <br/>
        <br/>
    </div>
    }
</div>
    
);
};
export default Billing;