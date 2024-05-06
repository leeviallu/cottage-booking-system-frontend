
import React, { useState, useEffect } from "react";
import axios from "axios";
import Customer from "./Customer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    postalcode: 0,
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/customers', formData);
      // Assuming the backend endpoint accepts formData directly
      console.log('Customer created successfully');
      setFormData({
        postalCode: 0,
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

  const filteredCustomers = customers.filter(customer =>
    (customer.firstName && customer.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.lastName && customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()))

  );

  return (
    <div>
      <h1>Create a Customer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalcode">Postal Code:</label><br />
        <input type="text" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} /><br />

        <label htmlFor="firstname">First Name:</label><br />
        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br />

        <label htmlFor="lastName">Last Name:</label><br />
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} /><br />

        <label htmlFor="address">Address:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="phoneNumber">Phone Number:</label><br />
        <input type="tel" id="phoneNumber" name="phoneNumber" pattern="\d{7}" maxLength="7" value={formData.phoneNumber} onChange={handleChange} /><br />

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
};

export default Customers;
