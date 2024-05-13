import axios from "axios";
import { useState, useEffect } from 'react';
const Service = ({service}) => {
    const [areas, setAreas] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        areaId: service.areaId,
        name: service.name,
        price: service.price,    
        description: service.description,            
            
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
        axios.delete(`http://localhost:8080/api/services/${id}`);
        // fetchServices();
    } catch (error) {
        console.error('Virhe palvelun poistamisessa:', error);
    }
    window.location.reload();
};

const handleEdit = async (event, id) => {
    const { areaId, name, description, price } = formData;
    const serviceid=service.serviceId
    event.preventDefault();
    console.log(formData)
    axios.put(`http://localhost:8080/api/services/${serviceid}`, 
    {

        area: { areaId: areaId },
        name: name,
        description: description,
        price: price,

    }
    )
    window.location.reload();
};

useEffect(() => {
    const fetchAreas = async () => {
        try {
            const fetchedAreas = await axios.get('http://localhost:8080/api/areas');
            setAreas(fetchedAreas.data);
            setFormData({...formData, areaId: fetchedAreas.data[0].areaId });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchAreas();
}, []);

return(<div>
    {
        editing
    ?
    <form onSubmit={handleEdit}>
    
        
        <label htmlFor="items">Alue:</label>
        <br />
        
        <select id="areaId" name="areaId" value={formData.areaId} onChange={handleChange}>
            {areas.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                    {area.name}
                </option>
            ))}
        </select>
        <br />

        <label htmlFor="name">Nimi:</label><br/>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        <br />
        <label htmlFor="description">Kuvaus:</label><br/>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
        <br />

        <label htmlFor="price">Hinta:</label><br/>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        <br />

        <button type="submit">Luo</button>
        <br/>
        <br/>
        <button onClick={() => setEditing(!editing)}>Muokkaa</button>

        <button onClick={(event) => handleDelete(event, service.serviceId)}>Poista</button>
        <br/>
    </form>

    :
    <div key={service.serviceId}>
        <p>
        <b>Alue:</b> {service.area.name}
        <br/>
        <b>Nimi:</b> {service.name}
        <br/>            
        <b>Kuvaus:</b> {service.description}
        <br/>
        <b>Hinta:</b> {service.price}
        <br/>
        </p>
        <button onClick={() => setEditing(!editing)}>Muokkaa</button>
        <button onClick={(event) => handleDelete(event, service.serviceId)}>Poista</button>
        <br/>
        <br/>
        <br/>
    </div>
    }
</div>
    
);
};

export default Service;