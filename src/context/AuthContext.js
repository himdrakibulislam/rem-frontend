import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthMe } from "../hooks/react-query/auth";
import ProgressBar from "../components/ProgressBar";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const { data, isLoading } = useAuthMe();
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  // Check if the user has a specific permission
  const hasPermission = (permission) => {
    return user?.permissions.includes(permission);
  };

  // Check if the user has a specific role
  const hasRole = (role) => {
    return user?.roles.includes(role);
  };
  console.log("Current user:", user?.name);
  if (isLoading) {
    return <ProgressBar />;
  }

  return (
    <AuthContext.Provider value={{ user: data, setUser,hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
