import { useState } from 'react';

const Cottages = () => {
    const [formData, setFormData] = useState({
        areaId: '',
        postalcode: 0,
        name: '',
        address: '',
        price: 0,
        description: '',
        capacity: '',
        equipment: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const { areaId, postalcode, name, address, price, description, capacity, equipment } = formData;
        e.preventDefault();
        console.log(areaId, postalcode, name, address, price, description, capacity, equipment);
        setFormData({
            areaId: '',
            postalcode: 0,
            name: '',
            address: '',
            price: 0,
            description: '',
            capacity: '',
            equipment: ''
        })
    };
  
    return (
        <div>
            <h1>Cottages</h1>
            <h2>Create a cottage</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="areaId">Area ID:</label>
                <input type="text" id="areaId" name="areaId" value={formData.areaId} onChange={handleChange} />
                <br />


                <label htmlFor="postalcode">Postal Code:</label>
                <input type="number" id="postalcode" name="postalcode" value={formData.postalcode} onChange={handleChange} min="10000" max="99999" />
                <br />

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                <br />


                
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                <br />


                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <br />

                <label htmlFor="capacity">Capacity:</label>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                <br />


                <label htmlFor="equipment">Equipment:</label>
                <input type="text" id="equipment" name="equipment" value={formData.equipment} onChange={handleChange} />
                <br />


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Cottages;