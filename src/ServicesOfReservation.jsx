import { useEffect, useState } from 'react';
import axios from 'axios';
const ServicesOfReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        reservationId: '',
        serviceId: '',
        count: 0,
    });
    const [sorSearchResult, setSorSearchResult] = useState([]);
    const [reservationId, setReservationId] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleCustChange = (e) => {
        setReservationId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {serviceId, reservationId, count} = formData;
        axios.get(`http://localhost:8080/api/sor/${reservationId}/${serviceId}`)
            .then(res => {
                if(res.data == '') {
                    axios.post('http://localhost:8080/api/sor',
                        {
                            'serviceId': serviceId,
                            'reservationId': reservationId,
                            'count': count
                        }
                    ).then(() => {
                        window.location.reload();
                    })
                        .catch(e => {
                            console.error('Error while creating Services of Reservation: ', e);
                        });
                }
                axios.put('http://localhost:8080/api/sor',
                    {
                        'serviceId': serviceId,
                        'reservationId': reservationId,
                        'count': count
                    }
                ).then(() => {
                    window.location.reload();
                })
                    .catch(e => {
                        console.error('Error while editing Services of Reservation: ', e);
                    });
            })
            .catch(e => {
                console.error('Error while creating Services of Reservation: ', e);
            });
    };

    const handleDelete = (serviceId, reservationId) => {
        axios.delete(`http://localhost:8080/api/sor/${reservationId}/${serviceId}`)
            .then(() => {
                setSorSearchResult(sorSearchResult.filter(sor => sor.serviceId !== serviceId));
            }).catch(e => {
                console.error('Error deleting service of reservation: ', e);
            });
    };


    const searchSor =(e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/api/sor/${reservationId}`)
            .then(res => {
                setSorSearchResult(res.data);
            }).catch(e => {
                console.error('Error fetching services: ', e);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/reservations')
            .then(res => {
                setReservations(res.data);
                setReservationId(res.data[0].reservationId);
            }).catch(e => {
                console.error('Error fetching reservations: ', e);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/services')
            .then(res => {
                setServices(res.data);
            }).catch(e => {
                console.error('Error fetching services: ', e);
            });
    }, []);

    useEffect(() => {
        if(reservations[0] && services[0]) {
            setFormData({...formData, reservationId: reservations[0].reservationId, serviceId: services[0].serviceId});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations, services]);
    return (
        <div className="container">
            <h1>Varauksen palvelut</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reservationId">Varaus:</label>
                <br />
                <select id="reservationId" name="reservationId" value={formData.reservationId} onChange={handleChange}>
                    {reservations.map((reservation) => {
                        return(
                            <option key={reservation.reservationId} value={reservation.reservationId}>
                                {reservation.customer.email}
                                {', '}
                                {new Date(reservation.reservationStartingDate).toISOString().split('T')[0]}
                            -
                                {new Date(reservation.reservationEndingDate).toISOString().split('T')[0]}
                            </option>
                        );
                    })}
                </select>
                <br />

                <label htmlFor="serviceId">Palvelu:</label>
                <br />
                <select id="serviceId" name="serviceId" value={formData.serviceId} onChange={handleChange}>
                    {services.map((service) => {
                        return(
                            <option key={service.serviceId} value={service.serviceId}>
                                {service.name}
                                {', '}
                                {service.description}
                            </option>
                        );
                    })}
                </select>
                <br />

                <label htmlFor="count">Määrä:</label>
                <br />
                <input
                    type="number"
                    id="count"
                    name="count"
                    value={formData.count}
                    onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Count must be bigger than 0.')}
                    onInput={e => e.target.setCustomValidity('')}
                    min="1"
                    max="1000"
                    required
                />
                <br />
                <button type="submit">Lisää varaukseen</button>
            </form>

            <h2>Hae Varauksen palveluja</h2>
            <div>
                <form onSubmit={searchSor} >
                    <select id="reservationId" name="reservationId" value={reservationId} onChange={handleCustChange}>
                        {reservations.map((reservation) => {
                            return(
                                <option key={reservation.reservationId} value={reservation.reservationId}>
                                    {reservation.customer.email}
                                    {', '}
                                    {new Date(reservation.reservationStartingDate).toISOString().split('T')[0]}
                            -
                                    {new Date(reservation.reservationEndingDate).toISOString().split('T')[0]}
                                </option>
                            );
                        })}
                    </select>
                    <button type="submit">Hae</button>
                </form>
                {sorSearchResult.map((sor) => {
                    const matchedService = services.find(service => service.serviceId === sor.serviceId);
                    return (
                        <div key={sor.serviceId}>
                            {matchedService && (
                                <p>{matchedService.name}</p>
                            )}
                            <p>Määrä: {sor.count}</p>
                            <button onClick={() => handleDelete(sor.serviceId, sor.reservationId)}>Poista</button>

                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ServicesOfReservation;