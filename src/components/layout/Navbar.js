import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faTasks } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  
  const onLogout = () => {
    logout();
  };
  
  const authLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <span className="nav-link">
          <FontAwesomeIcon icon={faUser} className="me-1" />
          {user?.username}
        </span>
      </li>
      <li className="nav-item">
        <a 
          href="#!" 
          className="nav-link" 
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
          Logout
        </a>
      </li>
    </ul>
  );
  
  const guestLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faTasks} className="me-2" />
          Todo App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;