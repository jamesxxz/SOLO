import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccountContextProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;  // Add password
  setPassword: (password: string) => void;  // Add setPassword
  profilePhoto: File | null;
  setProfilePhoto: (file: File | null) => void;
  role: string;
  setRole: (role: string) => void;
}

const defaultValue: AccountContextProps = {
  name: '',
  setName: () => {},
  email: '',
  setEmail: () => {},
  password: '',  // Initialize password state
  setPassword: () => {},  // Add setPassword
  profilePhoto: null,
  setProfilePhoto: () => {},
  role: '',
  setRole: () => {},
};

export const AccountContext = createContext<AccountContextProps>(defaultValue);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Initialize password state
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [role, setRole] = useState('');

  return (
    <AccountContext.Provider value={{ name, setName, email, setEmail, password, setPassword, profilePhoto, setProfilePhoto, role, setRole }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextProps => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
