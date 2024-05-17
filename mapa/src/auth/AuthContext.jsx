import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setEmail(data.user.email);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const login = async (email, password, navigate) => {
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                const { authToken } = data;
                setAuthToken(authToken);
                console.log("El authToken es: "+authToken);
                localStorage.setItem('authToken', authToken);
                setUser({ email });  // Simplemente establecemos el email como el usuario       Chapuza X(
                setEmail(email);
                navigate('/user');
            } else {
                console.error("Failed to login");
            }
        } catch (error) {
            console.error("Error logging in", error);
        }
    };

    const register = async (name, email, password, navigate) => {
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (data.success) {
                const { authToken } = data;
                setAuthToken(authToken);
                localStorage.setItem('authToken', authToken);
                setUser({ email });
                setEmail(email);
                navigate('/user');
            } else {
                console.error("Failed to register");
            }
        } catch (error) {
            console.error("Error registering", error);
        }
    };

    const logout = async (navigate) => {
        try {
            const response = await fetch("http://localhost:8000/api/logout", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "POST",
            });
            const data = await response.json();
            if (data.success) {
                setAuthToken('');
                localStorage.removeItem('authToken');
                setUser(null);
                setEmail('');
                navigate('/');
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, email, user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
