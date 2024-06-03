import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
    userId: string | null;
    login: (id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            console.log('User ID loaded from local storage:', storedUserId);
        }
    }, []);

    const login = (id: string) => {
        setUserId(id);
        localStorage.setItem('userId', id);
        console.log('User ID stored in context and local storage:', id);
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem('userId');
        console.log('User ID removed from context and local storage');
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
