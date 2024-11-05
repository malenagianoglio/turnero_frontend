import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Cambia aquí

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token); // Cambia aquí
            setUserRole(decodedToken.rol); // Guardamos el rol desde el token
            setUserId(decodedToken.id); // Guardamos el ID del usuario desde el token
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        const decodedToken = jwtDecode(token); // Cambia aquí
        setUserRole(decodedToken.rol);
        setUserId(decodedToken.id); // Almacena el ID del usuario al iniciar sesión
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null); // Limpia el ID del usuario al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
