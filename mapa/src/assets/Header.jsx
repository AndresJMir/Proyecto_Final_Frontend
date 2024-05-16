import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user } = useAuth();
    console.log("En user hay: ", user);
    return (
        <header style={{ backgroundColor: '#007bff', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <h1>Mi página web</h1>
            {
              user 
              ? <Link to="/user" className="btn btn-warning" style={{ borderRadius: '20px', color: 'white' }}>Mi cuenta</Link>
              : <Link to="/login" className="btn btn-primary" style={{ borderRadius: '20px', color: 'white' }}>Iniciar Sesión</Link>
            }
        </header>
    );
};

export default Header;
