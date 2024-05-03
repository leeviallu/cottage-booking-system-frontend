import { useState } from "react";
import axios from "axios";

const Customers = () => {
  const [formData, setFormData] = useState({
    postalCode: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: ""
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:8080/api/customers', {
        "postal": {
          "postalcode": formData.postalCode
        },
        "firstname": formData.firstName,
        "lastname": formData.lastName,
        "address": formData.address,
        "email": formData.email,
        "phonenumber": formData.phoneNumber
      });

      console.log('Customer created successfully:', response.data);
      setSuccessMessage("Asiakastiedot lisätty onnistuneesti");
    } catch (error) {
      console.error('Failed to create customer:', error);
      setErrorMessage("Asiakastietojen lisäämisessä on tapahtunut virhe");
    }
  };

  return (
    <div>
      <h2>Asiakastiedot</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleCreate}>
        <label htmlFor="postalCode">Postinumero:</label><br />
        <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} /><br />

        <label htmlFor="firstName">Etunimi:</label><br />
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} /><br />

        <label htmlFor="lastName">Sukunimi:</label><br />
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} /><br />

        <label htmlFor="address">Lähiosoite:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

        <label htmlFor="phoneNumber">Puhelinnumero:</label><br />
        <input type="tel" id="phoneNumber" name="phoneNumber" pattern="\d{7}" maxLength="7" value={formData.phoneNumber} onChange={handleChange} /><br />

        <input type="submit" value="Luo asiakas" />
      </form>
    </div>
  );
};

export default Customers;