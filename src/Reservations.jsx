import { useState } from 'react';

const Reservations = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        // Add your reservation submission logic here
    };

    return (
        <div>
            <h1>Make a Reservation</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Reservations;
