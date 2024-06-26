import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Areas from './Areas';
import Cottages from './Cottages';
import Reservations from './Reservations';
import Services from './Services';
import Customers from './Customers';
import Billings from './Billings';
import Reports from './Reports';
import ServicesOfReservation from './ServicesOfReservation';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="areas" element={<Areas />} />
                    <Route path="cottages" element={<Cottages />} />
                    <Route path="reservations" element={<Reservations />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services-of-reservation" element={<ServicesOfReservation />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="billings" element={<Billings/>} />
                    <Route path="reports" element={<Reports/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
