import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

/**
 * AuthProvider envuelve la app y provee:
 * - user: objeto { id, name, email, preferences, ... }
 * - login(credentials): simula login y almacena user
 * - logout(): cierra sesión
 * - updateProfile(updates): actualiza perfil local y en storage
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carga usuario desde localStorage al iniciar la app
  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem('auth_user', JSON.stringify(u));
    else localStorage.removeItem('auth_user');
  };

  const login = async ({ email, password }) => {
    // Aquí va llamada real a backend. Por ahora simulamos:
    // aceptar cualquier email/password no vacío
    if (!email || !password) throw new Error('Credenciales inválidas');
    const fakeUser = {
      id: Date.now(),
      name: 'Nombre Usuario',
      email,
      address: '',
      phone: '',
      preferences: {
        newsletter: true,
        promos: false,
      },
    };
    persist(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    persist(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    persist(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
