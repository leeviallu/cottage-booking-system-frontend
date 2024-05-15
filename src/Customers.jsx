
import { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './Customer';
import postalcodes from 'datasets-fi-postalcodes';

const Customers = () => {
    const postals = Object.keys(postalcodes).map((key) => [key, postalcodes[key]]);
    const [postalSearchTerm, setPostalSearchTerm] = useState('');
    const [filteredPostalcodes, setFilteredPostalcodes] = useState([]);
    const [formData, setFormData] = useState({
        postalcode: postals[0][0],
        firstname: '',
        lastname: '',
        address: '',
        email: '',
        phonenumber: ''
    });
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { postalcode, firstname, lastname, address, email, phonenumber } = formData;
        const position = postalcodes[postalcode];
        if (position == null) {
            console.error('Given postalcode doesn\'t exist.');
        } else {
            axios.get('http://localhost:8080/api/postal/' + postalcode)
                .then(response => {
                    if(response.data == '') {
                        axios.post('http://localhost:8080/api/postal',
                            {
                                'postalcode': postalcode,
                                'position': position
                            }
                        ).then(() => {
                            axios.post('http://localhost:8080/api/customers',
                                {
                                    'postal': {
                                        'postalcode': postalcode
                                    },
                                    'firstname': firstname,
                                    'lastname': lastname,
                                    'address': address,
                                    'email': email,
                                    'phonenumber': phonenumber
                                }
                            ).then(() => {
                                setFormData({
                                    postalCode: 0,
                                    firstname: '',
                                    lastname: '',
                                    address: '',
                                    email: '',
                                    phonenumber: ''
                                });
                            })
                                .catch(err => {
                                    console.error('Error while posting customer', err);
                                });
                        })
                            .catch(err => {
                                console.error('Error while posting postal', err);
                            });
                    } else {
                        axios.post('http://localhost:8080/api/customers',
                            {
                                'postal': {
                                    'postalcode': postalcode
                                },
                                'firstname': firstname,
                                'lastname': lastname,
                                'address': address,
                                'email': email,
                                'phonenumber': phonenumber
                            }
                        ).then(() => {
                            setFormData({
                                postalCode: 0,
                                firstname: '',
                                lastname: '',
                                address: '',
                                email: '',
                                phonenumber: ''
                            });
                        })
                            .catch(err => {
                                console.error('Error while posting customer', err);
                            });
                    }
                })
                .catch(err => {
                    console.error('Error while getting postalcode', err);
                });
        }
    };

    const searchCustomer = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8080/api/customers/search?email=' + searchEmail)
            .then(res => {
                setSearchResult(res.data);
                setSearchEmail('');
            })
            .catch(e => {
                console.error(e);
            });
    };

    useEffect(() => {
        const filteredPostals = postals.filter(postal =>
            postal[0].includes(postalSearchTerm)
        );
        setFilteredPostalcodes(filteredPostals);
        if (filteredPostals.length != 0) {
            setFormData({...formData, postalcode: filteredPostals[0][0]});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalSearchTerm]);

    return (
        <div className="container">
            <h1>Luo asiakas</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="postalSearchTerm">Postiosoite:</label><br/>
                <input
                    type="number"
                    id="postalSearchTerm"
                    value={postalSearchTerm}
                    onChange={event => setPostalSearchTerm(event.target.value)}
                /> <br/>
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
                <br/>
                <label htmlFor="firstname">Etunimi:</label><br />
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Nimi ei voi olla tyhjä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required/>
                <br />

                <label htmlFor="lastname">Sukunimi:</label><br />
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Sukunimi ei voi olla tyhjä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required /><br />

                <label htmlFor="address">Osoite:</label><br />
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Osoite ei voi olla tyhjä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required /><br />

                <label htmlFor="email">Sähköposti:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    onInvalid={e => e.target.setCustomValidity('Sähköposti ei voi olla tyhjä')}
                    onInput={e => e.target.setCustomValidity('')}
                    required/>
                <br />

                <label htmlFor="phonenumber">Puhelinnumero:</label><br />
                <input type="tel" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} /><br />

                <br/>
                <button className='btn' type="submit">Luo asiakas</button>
            </form>

            <form onSubmit={searchCustomer}>
                <label htmlFor="email"><h2>Asiakkaan email:</h2></label><br />
                <input type="text" id="email" name="email" value={searchEmail} onChange={event => setSearchEmail(event.target.value)} />
                <br />
                <button className='btn' type="submit">Hae</button>
            </form>
            {
                searchResult
                    ?
                    <Customer key={searchResult.customerId} customer={searchResult} />
                    :
                    null

            }

        </div>
    );
};
export default Customers;
