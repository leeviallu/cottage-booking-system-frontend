import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul className="navigation-menu">
                    <li>
                        <Link to="/areas">Alueet</Link>
                    </li>
                    <li>
                        <Link to="/cottages">Mökit</Link>
                    </li>
                    <li>
                        <Link to="/services">Palvelut</Link>
                    </li>
                    <li>
                        <Link to="/customers">Asiakkaat</Link>
                    </li>
                    <li>
                        <Link to="/reservations">Varaukset</Link>
                    </li>
                    <li>
                        <Link to="/services-of-reservation">Varauksen palvelut</Link>
                    </li>
                    <li>
                        <Link to="/billings">Laskut</Link>
                    </li>
                    <li>
                        <Link to="/reports">Raportit</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;