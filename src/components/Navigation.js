import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation-menu">
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/notes" activeClassName="active">Notes</NavLink>
        </li>
        <li>
          <NavLink to="/mern-notes" activeClassName="active">MERN Notes</NavLink>
        </li>
        <li>
          <NavLink to="/api" activeClassName="active">API</NavLink>
        </li>
        <li>
          <NavLink to="/apiserver" activeClassName="active">API Server</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
