
import React, { useState, useEffect } from "react";
import axios from "axios";
import Customer from "./Customer";
import postalcodes from "datasets-fi-postalcodes"

const Customers = () => {
  const postals = Object.keys(postalcodes).map((key) => [key, postalcodes[key]]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    postalcode: 0,
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phonenumber: ""
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Virhe asiakkaiden hakemisessa:', error);
      }
      
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { postalcode, firstname, lastname, address, email, phonenumber } = formData;
    const position = postalcodes[postalcode];
    console.log(formData)
    console.log(postalcode)
    console.log(position)
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
                    axios.post('http://localhost:8080/api/customers',
                        {
                            "postal": {
                                        "postalcode": postalcode
                                    },
                            "firstname": firstname,
                            "lastname": lastname,
                            "address": address,
                            "email": email,
                            "phonenumber": phonenumber
                        }
                    ).then(() => {
                        setFormData({
                          postalCode: "",
                          firstname: "",
                          lastname: "",
                          address: "",
                          email: "",
                          phonenumber: ""
                        });
                        axios.get('http://localhost:8080/api/customers')
                            .then(res => {
                                setCustomers(res.data);
                            })
                            .catch(err => {
                                console.error('Virhe asiakkaiden hakemisessa:', err);
                            })
                    })
                    .catch(err => {
                        console.error("Virhe asiakkaan lähettämisessä", err)
                    })
                })
                .catch(err => {
                    console.error("Virhe postiosoitteen lähettämisessä", err)
                })
            }
            else {
                axios.post('http://localhost:8080/api/customers',
                    {
                      "postal": {
                        "postalcode": postalcode
                    },
                      "firstname": firstname,
                      "lastname": lastname,
                      "address": address,
                      "email": email,
                      "phonenumber": phonenumber
                    }
                ).then(() => {
                    setFormData({
                      postalCode: "",
                      firstname: "",
                      lastname: "",
                      address: "",
                      email: "",
                      phonenumber: ""
                    });
                    axios.get('http://localhost:8080/api/customers')
                        .then(res => {
                            setCustomers(res.data);
                        })
                        .catch(err => {
                            console.error('Virhe asiakkaiden hakemisessa:', err);
                        })
                })
                .catch(err => {
                    console.error("Virhe asiakkaan lähettämisessä", err)
                })
            }
        })
        .catch(err => {
            console.error("Virhe postiosoitteen hakemisessa", err)
        })
}
  };

  const filteredCustomers = customers.filter(customer =>
    (customer.firstname && customer.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.lastname && customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()))

  );

  return (
    <div>
      <h1>Luo asiakas</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalcode">Postiosoite:</label><br />
        <input type="text" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} /><br />

        <label htmlFor="firstname">Etunimi:</label><br />
        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br />

        <label htmlFor="lastname">Sukunimi:</label><br />
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br />

        <label htmlFor="address">Osoite:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />

        <label htmlFor="email">Sähköposti:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="phonenumber">Puhelinnumero:</label><br />
        <input type="tel" id="phonenumber" name="phonenumber" pattern="\d{7}" maxLength="7" value={formData.phonenumber} onChange={handleChange} /><br />

        <br />
        <button type="submit">Luo asiakas</button>
      </form>

      <h1>Luodut asiakkaat</h1>
      <div>
        {customers.map(customer => 
          <Customer key={customer.customerId} customer={customer} />
        )
        }
          
      </div>

    </div>
  );
}
export default Customers;
