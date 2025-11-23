import React, { createContext, useContext, useState } from 'react';

type AdminContextType = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleThemeToDark: () => void;
  resetTheme: () => void;
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
  toggleThemeToDark: () => {},
  resetTheme: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'password';

  const login = (username: string, password: string) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const toggleThemeToDark = () => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.add('admin-dark');
    document.body.classList.add('admin-dark');
  };

  const resetTheme = () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('admin-dark');
    document.body.classList.remove('admin-dark');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, toggleThemeToDark, resetTheme }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
