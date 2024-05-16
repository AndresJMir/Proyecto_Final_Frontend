import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Mi Cuenta</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => logout(navigate)}>Cerrar Sesión</button>
            <button onClick={() => navigate('/')}>Volver</button>
        </div>
    );
};

export default UserPage;
