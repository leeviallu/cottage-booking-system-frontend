import React, { useState } from "react";
import axios from "axios";

const Customer = ({customer}) => {
  //const {nam, areaId: id} = area;
  //const [editing, setEditing] = useState(false);
  //const [areaName, setAreaName] = useState(name);

  /*
  const [formData, setFormData] = useState({
    postalCode: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/customers', formData);
      // Assuming the backend endpoint accepts formData directly
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
*/
console.log(customer.postal.postalCode)
  return (
    <div>
      <p>Nimi: {customer.firstname} {customer.lastname} </p>
      <p>Postiosoite: {customer.postal.postalcode}</p>
      <p>Osoite: {customer.address}</p>
      <p>Sähköposti: {customer.email}</p>
      <p>Puhelinumero: {customer.phonenumber}</p>

      <br />
      <br />
      </div>
  );
};

export default Customer;
