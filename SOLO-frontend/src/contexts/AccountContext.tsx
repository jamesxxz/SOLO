import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccountContextProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;  // Add phoneNumber
  setPhoneNumber: (phoneNumber: string) => void;  // Add setPhoneNumber
  password: string;
  setPassword: (password: string) => void;
  profilePhoto: File | null;
  setProfilePhoto: (file: File | null) => void;
  role: string;
  setRole: (role: string) => void;
  // New fields:
  age: string;
  setAge: (age: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  height: string;
  setHeight: (height: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  institute: string;
  setInstitute: (institute: string) => void;
}

const defaultValue: AccountContextProps = {
  name: '',
  setName: () => {},
  email: '',
  setEmail: () => {},
  phoneNumber: '',  // Initialize phoneNumber state
  setPhoneNumber: () => {},  // Initialize setPhoneNumber
  password: '',
  setPassword: () => {},
  profilePhoto: new File([""], "default.png"),
  setProfilePhoto: () => {},
  role: '',
  setRole: () => {},
  // Initialize new states:
  age: '',
  setAge: () => {},
  gender: '',
  setGender: () => {},
  height: '',
  setHeight: () => {},
  weight: '',
  setWeight: () => {},
  institute: '',
  setInstitute: () => {},
};


export const AccountContext = createContext<AccountContextProps>(defaultValue);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');  // State for phoneNumber
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [role, setRole] = useState('');
  // Adding new states
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [institute, setInstitute] = useState('');

  return (
    <AccountContext.Provider value={{
      name, setName, email, setEmail, phoneNumber, setPhoneNumber, password, setPassword,
      profilePhoto, setProfilePhoto, role, setRole,
      // Include new states in provider
      age, setAge, gender, setGender, height, setHeight, weight, setWeight, institute, setInstitute
    }}>
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

