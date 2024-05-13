import axios from "axios";
import { useState } from 'react';
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
            console.error('Virhe palvelun luonnissa:', error);
        }
        window.location.reload();
    }

    const fetchBillings = async () => {
        try {
            const fetchedBillings = await axios.get('http://localhost:8080/api/billings');
            setBillings(fetchedBillings.data);
        } catch (error) {
            console.error('Virhe laskujen haussa:', error);
        }
    };

    return (
        <div>
            <h1>Luo laskutus</h1>
            <form onSubmit={handleCreate}>
                <br />
                <label>
                    Varaus Id:
                    <input type="number" name="reservationId" value={formData.reservationId} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Hinta:
                    <input type="number" name="sum" value={formData.sum} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Onko maksettu:
                    <input type="text " name="isPaid" value={formData.isPaid} onChange={handleChange} />
                </label>
                <br />
                <button type="create">Luo</button>
            </form>
            <h2>Kaikki laskutukset</h2>
            <ul>
                {billings.map(billing => (
                    <li key={billing.id}>
                        <p>Varaus Id: {billing.reservationId}</p>
                        <p>Hinta: {billing.sum}</p>
                        <p>Onko maksettu: {billing.isPaid}</p>
                    </li>
                ))}
            </ul>
    </div>
    );
};
export default Billings;
