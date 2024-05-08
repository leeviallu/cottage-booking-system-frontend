
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
  console.log(customers)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
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
    console.error("Given postalcode doesn't exist.")
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
                                console.error('Error while fetching customers:', err);
                            })
                    })
                    .catch(err => {
                        console.error("Error while posting customer", err)
                    })
                })
                .catch(err => {
                    console.error("Error while posting postal", err)
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
                            console.error('Error while fetching customers:', err);
                        })
                })
                .catch(err => {
                    console.error("Error while posting customer", err)
                })
            }
        })
        .catch(err => {
            console.error("Error while getting postalcode", err)
        })
}
  };

  const filteredCustomers = customers.filter(customer =>
    (customer.firstname && customer.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.lastname && customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()))

  );

  return (
    <div>
      <h1>Create a Customer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalcode">Postal Code:</label><br />
        <input type="text" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} /><br />

        <label htmlFor="firstname">First Name:</label><br />
        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br />

        <label htmlFor="lastname">Last Name:</label><br />
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br />

        <label htmlFor="address">Address:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="phonenumber">Phone Number:</label><br />
        <input type="tel" id="phonenumber" name="phonenumber" pattern="\d{7}" maxLength="7" value={formData.phonenumber} onChange={handleChange} /><br />

        <button type="submit">Create Customer</button>
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
