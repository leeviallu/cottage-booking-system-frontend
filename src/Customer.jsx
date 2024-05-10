import React, { useState, useEffect } from "react";
import axios from "axios";
import postalcodes from 'datasets-fi-postalcodes';

const Customer = ({ customer }) => {
  const postals = Object.keys(postalcodes).map((key) => [key, postalcodes[key]]);
  const [postalSearchTerm, setPostalSearchTerm] = useState("");
  const [filteredPostalcodes, setFilteredPostalcodes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    postalcode: customer.postal.postalcode,
    firstname: customer.firstname,
    lastname: customer.lastname,
    address: customer.address,
    email: customer.email,
    phonenumber: customer.phonenumber
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleEdit = (e) => {
    e.preventDefault();
    const { postalcode, firstname, lastname, address, email, phonenumber } = formData;
    const id=customer.customerId
    const position = postalcodes[postalcode];
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
                    axios.put(`http://localhost:8080/api/customers/${id}`, 
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
                    )
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error("Error while editing customer", err)
                    })
                  })
                  .catch(err => {
                      console.error("Error while posting postal", err)
                })
              }
              else {
                  axios.put(`http://localhost:8080/api/customers/${id}`,
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
                )
                  .then(() => {
                      window.location.reload();
                  })
                  .catch(err => {
                      console.error("Error while editing customer", err)
                  })
                } 
            }).catch(err => {
                console.error("Error while fetching postal", err)
            })
        }
                          
 };

  const handleDelete = (event, id) => {
    event.preventDefault();
    axios.delete(`http://localhost:8080/api/customers/${id}`)
        .then(() => {
            window.location.reload();
        })
        .catch(err => {
            console.error('Error deleting data:', err);
        })
  };
  useEffect(() => {
    const filteredPostals = postals.filter(postal => 
        postal[0].includes(postalSearchTerm)
    );
    setFilteredPostalcodes(filteredPostals);
    if (filteredPostals.length != 0 && filteredPostals.length != postals.length) {
      setFormData({...formData, postalcode: filteredPostals[0][0]})
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [postalSearchTerm]);


return (
  <div>
    {editing ? (
      
      <form onSubmit={handleEdit}>
      <label htmlFor="postalSearchTerm">Postalcode:</label><br/>
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
        <label htmlFor="firstname">First Name:</label><br />
        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br />

        <label htmlFor="lastname">Last Name:</label><br />
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br />

        <label htmlFor="address">Address:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="phonenumber">Phone Number:</label><br />
        <input type="tel" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} /><br />

      
        <button type="submit">Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </form>
    ) : (
      <div>
        <p>Postal: {customer.postal.postalcode}</p>
        <p>First Name: {customer.firstname}</p>
        <p>Last Name: {customer.lastname}</p>
        <p>Address: {customer.address}</p>
        <p>Email: {customer.email}</p>
        <p>Phone Number: {customer.phonenumber}</p>
        <button onClick={() => setEditing(!editing)}>Edit</button>
        <button onClick={(event) => handleDelete(event, customer.customerId)}>Remove</button>
      </div>
    )}
  </div>
);
};

export default Customer;
