import { useState, useEffect } from 'react';
import axios from 'axios';
import Cottage from './Cottage';
import postalcodes from 'datasets-fi-postalcodes';

const Cottages = () => {
    const postals = Object.keys(postalcodes).map((key) => [key, postalcodes[key]]);
    const [areas, setAreas] = useState([]);
    const [cottages, setCottages] = useState([]);
    const [cottageSearchTerm, setCottageSearchTerm] = useState("");
    const [cottageSearchResults, setCottageSearchResults] = useState([]);
    const [postalSearchTerm, setPostalSearchTerm] = useState("");
    const [filteredPostalcodes, setFilteredPostalcodes] = useState([]);    
    const [formData, setFormData] = useState({
        areaId: '',
        postalcode: postals[0][0],
        name: '',
        address: '',
        price: 0,
        description: '',
        capacity: 0,
        equipment: ''
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { areaId, postalcode, name, address, price, description, capacity, equipment } = formData;
        const position = postalcodes[postalcode];
        if (position == null) {
            console.error("Annettu postiosoite ei ole oikea.")
        } else {
            axios.get('http://localhost:8080/api/postal/' + postalcode)
                .then(response => {
                    if(response.data == "") {
                        axios.post('http://localhost:8080/api/postal', 
                                    {
                                        "postalcode": postalcode,
                                        "position": position
                                    }
                        ).then(() => {
                            axios.post('http://localhost:8080/api/cottages',
                                {
                                    "description": description,
                                    "address": address,
                                    "postal": {
                                                "postalcode": postalcode
                                            },
                                    "name": name,
                                    "price": price,
                                    "equipment": equipment,
                                    "area": {
                                                "areaId": areaId
                                            },
                                    "capacity": capacity
                                }
                            ).then(() => {
                                setFormData({
                                    areaId: '',
                                    postalcode: 0,
                                    name: '',
                                    address: '',
                                    price: 0,
                                    description: '',
                                    capacity: '',
                                    equipment: ''
                                });
                                axios.get('http://localhost:8080/api/cottages')
                                    .then(res => {
                                        setCottages(res.data);
                                    })
                                    .catch(err => {
                                        console.error('Virhe mökkien hakemisessa', err);
                                    })
                            })
                            .catch(err => {
                                console.error("Virhe mökin lähettämisessä", err)
                            })
                        })
                        .catch(err => {
                            console.error("Virhe postiosoitteen lähettämisessä", err)
                        })
                    }
                    else {
                        axios.post('http://localhost:8080/api/cottages',
                            {
                                "description": description,
                                "address": address,
                                "postal": {
                                            "postalcode": postalcode
                                        },
                                "name": name,
                                "price": price,
                                "equipment": equipment,
                                "area": {
                                            "areaId": areaId
                                        },
                                "capacity": capacity
                            }
                        ).then(() => {
                            setFormData({
                                areaId: '',
                                postalcode: 0,
                                name: '',
                                address: '',
                                price: 0,
                                description: '',
                                capacity: '',
                                equipment: ''
                            });
                            axios.get('http://localhost:8080/api/cottages')
                                .then(res => {
                                    setCottages(res.data);
                                })
                                .catch(err => {
                                    console.error('Virhe mökkien hakemisessa:', err);
                                })
                        })
                        .catch(err => {
                            console.error("Virhe mökin lähettämisessä", err)
                        })
                    }
                })
                .catch(err => {
                    console.error("Virhe postiosoitteen hakemisessa", err)
                })
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/areas')
            .then(res => {
                setAreas(res.data);
                setFormData({...formData, areaId: res.data[0].areaId})
            })
            .catch(err => {
                console.error('Error while fetching areas:', err);
            })
        axios.get('http://localhost:8080/api/cottages')
            .then(res => {
                setCottages(res.data);
            })
            .catch(err => {
                console.error('Virhe mökin hakemisessa:', err);
            })   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filteredPostals = postals.filter(postal => 
            postal[0].includes(postalSearchTerm)
        );
        setFilteredPostalcodes(filteredPostals);
        if (filteredPostals.length != 0) {
            setFormData({...formData, postalcode: filteredPostals[0][0]})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalSearchTerm])

    useEffect(() => {
        const filteredCottages = cottages.filter(cottage => 
            cottage.name != null 
            ?
            cottage.name.toLowerCase().includes(cottageSearchTerm.toLowerCase())
            : null
        );
        setCottageSearchResults(filteredCottages);
    }, [cottages, cottageSearchTerm])

    return (
        <div>
            <h1>Mökit</h1>
            <h2>Luo mökki</h2>
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
                <br />

                <label htmlFor="name">Nimi:</label><br/>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}  
                    onInvalid={e => e.target.setCustomValidity('Nimi vaaditaan')} 
                    onInput={e => e.target.setCustomValidity('')}
                    required
                />
                <br />

                <label htmlFor="address">Osoite:</label><br/>
                <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Osoite vaaditaan')} onInput={e => e.target.setCustomValidity('')} 
                    required
                />
                <br />
                
                <label htmlFor="postalSearchTerm">Postiosoite:</label><br/>
                <input 
                    type="number"
                    id="postalSearchTerm" 
                    value={postalSearchTerm} 
                    onChange={event => setPostalSearchTerm(event.target.value)} 
                />
                <br />
                <select id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange}>
                    {
                        filteredPostalcodes.map((postalcode) => (
                                <option key={postalcode[0]} value={postalcode[0]}>
                                    {postalcode[0]} {postalcode[1]}
                                </option>
                            )
                        )        
                    }
                </select>
                <br />

                <label htmlFor="description">Kuvaus:</label><br/>
                <textarea 
                    type="text" 
                    id="description"
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    cols="30" 
                    rows="5" 
                />
                <br />

                <label htmlFor="equipment">Lisäpalvelut:</label><br/>
                <textarea 
                    type="text" 
                    id="equipment" 
                    name="equipment" 
                    value={formData.equipment} 
                    onChange={handleChange} 
                    cols="30" 
                    rows="5" 
                />
                <br />
                <br />

                <label htmlFor="capacity">Kapasiteetti:</label><br/>
                <input 
                    type="number" 
                    id="capacity" 
                    name="capacity" 
                    value={formData.capacity} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Kapasiteetin pitää olla suurempi kuin 0.')} 
                    onInput={e => e.target.setCustomValidity('')} 
                    min="1" 
                    max="100000" 
                    required 
                />
                <br />

                <label htmlFor="price">Hinta:</label><br/>
                <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    onInvalid={e => e.target.setCustomValidity('Hinnan pitää olla suurempi kuin 0.')} 
                    onInput={e => e.target.setCustomValidity('')} 
                    min="1" 
                    max="100000" 
                    required 
                />
                <br />
                <br />

                <button type="submit">Luo</button>
            </form>

            <h2>Etsi mökkiä:</h2>
            <input id="cottagesearchterm" value={cottageSearchTerm} onChange={event => setCottageSearchTerm(event.target.value)} />
            <h3>Tulokset:</h3>
            <div>
                {
                    cottageSearchResults.map(cottage => 
                        cottage.name != null 
                            ?    
                            <Cottage key={cottage.cottageId} cottage={cottage} />
                            :
                            null   
                    )
                }
            </div>
        </div>
    );
};

export default Cottages;