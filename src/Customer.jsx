import React, { useState, useEffect } from "react";
import axios from "axios";

const Customer = ({ customer }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    postalCode: customer.postal.postalCode,
    firstName: customer.firstname,
    lastName: customer.lastname,
    address: customer.address,
    email: customer.email,
    phoneNumber: customer.phonenumber
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:8080/api/customers', formData);
      console.log('Asiakas luotu onnistuneesti!');
      setFormData({
        postalCode: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phoneNumber: ""
      });
    } catch (error) {
      console.error('Virhe asiakkaan luonnissa:', error);
    }
  };

  const handleEdit = async () => {
    
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/customers/${id}`)
      .then(() => {
        console.log('Asiakas poistettu onnistuneesti!');
        // Perform any additional actions after successful deletion, such as updating the UI
      })
      .catch(err => {
        console.error('Virhe asiakkaan poistamisessa:', err);
      });
  };


  return (
    <div>
      {editing ? (
        <form onSubmit={handleEdit}>
          <label htmlFor="firstname">Etunimi:</label><br/>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br/>
          <label htmlFor="lastname">Sukunimi:</label><br/>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br/>
          <label htmlFor="address">Osoite:</label><br/>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br/>
          <label htmlFor="email">Sähköposti:</label><br/>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br/>
          <label htmlFor="phonenumber">Puhelinnumero:</label><br/>
          <input type="text" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} /><br/>
          <button type="submit">Tallenna</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Etunimi: {customer.firstname}</p>
          <p>Sukunimi: {customer.lastname}</p>
          <p>Osoite: {customer.address}</p>
          <p>Sähköposti: {customer.email}</p>
          <p>Puhelinnumero: {customer.phonenumber}</p>
          <button onClick={() => setEditing(true)}>Muokkaa</button>
          <button onClick={() => handleDelete(customer.id)}>Poista</button>
        </div>
      )}
    </div>
  );
};

export default Customer;
