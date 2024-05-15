import axios from 'axios';
import { useEffect, useState } from 'react';

const Reports = () => {
    const [areas, setAreas] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cottages, setCottages] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({
        areaId: 0,
        startDate: '',
        endDate: ''
    });

    let total = 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStartDate(formData.startDate);
        setEndDate(formData.endDate);
        axios.get(`http://localhost:8080/api/reservations/cottages/${formData.areaId}?startDate=${formData.startDate}&endDate=${formData.endDate}`)
            .then(res => {
                setReservations(res.data);
            });
        axios.get(`http://localhost:8080/api/cottages/area/${formData.areaId}`)
            .then(res => {
                setCottages(res.data);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/areas')
            .then((res) => {
                setAreas(res.data);
                setFormData({...formData, areaId: res.data[0].areaId});
            })
            .catch((err) => {
                console.error('Error fetching areas:', err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Mökkien raportit</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="areaId">Alue:</label>
                <br />
                <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
                    {areas.map((area) => (
                        <option key={area.areaId} value={area.areaId}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="startDate">Alkamispäivä:</label>
                <br />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Aste alkamispäivä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required />
                <br />
                <label htmlFor="endDate">Päättymispäivä:</label>
                <br />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Aste päättymispäivä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required  />
                <br />

                <button className='btn' type="submit">Luo</button>
            </form>
            <br />
            <br />

            {
                reservations[0] && cottages[0] ?
                    <div className='item-container'>
                        <h2>{cottages[0].area.name} palvelu raportti välillä {startDate} ja {endDate}</h2>

                        {cottages.map(cottage => {
                            let cottageTotal = 0;
                            let reservationCount = 0;

                            reservations.map(reservation => {
                                if(reservation.cottage.cottageId == cottage.cottageId) {
                                    cottageTotal += cottage.price;
                                    reservationCount++;
                                }
                            });

                            total += cottageTotal;

                            return (
                                <div key={cottage.cottageId}>
                                    <h3>{cottage.name}</h3>
                                    <p>{cottage.address}</p>
                                    <p>Varatut mökit: {reservationCount}€</p>
                                    <p>Yhteensä: {cottageTotal}</p>
                                    <br/>
                                </div>
                            );
                        })}

                        <h3>Alue yhteensä: {total}€</h3>

                    </div>
                    :
                    null
            }


        </div>
    );
};

export default Reports;