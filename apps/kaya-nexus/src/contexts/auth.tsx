import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Pour démo : état local, à remplacer par vraie logique auth plus tard
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  const login = (userData) => {
    setUser(userData);
    setRole(userData?.role || "user");
  };
  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
