import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="navigation-menu">
          <li>
            <Link to="/areas">Areas</Link>
          </li>
          <li>
            <Link to="/cottages">Cottages</Link>
          </li>
          <li>
            <Link to="/reservations">Reservations</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/billings">Billings</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;