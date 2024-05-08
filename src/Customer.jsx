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
      console.log('Customer created successfully');
      setFormData({
        postalCode: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phoneNumber: ""
      });
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const handleEdit = async () => {
    
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/customers/${id}`)
      .then(() => {
        console.log('Customer deleted successfully');
        // Perform any additional actions after successful deletion, such as updating the UI
      })
      .catch(err => {
        console.error('Error while deleting customer:', err);
      });
  };


  return (
    <div>
      {editing ? (
        <form onSubmit={handleEdit}>
          <label htmlFor="firstname">First Name:</label><br/>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br/>
          <label htmlFor="lastname">Last Name:</label><br/>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br/>
          <label htmlFor="address">Address:</label><br/>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br/>
          <label htmlFor="email">Email:</label><br/>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br/>
          <label htmlFor="phonenumber">Phone Number:</label><br/>
          <input type="text" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} /><br/>
          <button type="submit">Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>First Name: {customer.firstname}</p>
          <p>Last Name: {customer.lastname}</p>
          <p>Address: {customer.address}</p>
          <p>Email: {customer.email}</p>
          <p>Phone Number: {customer.phonenumber}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Customer;
