import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // Función para decodificar el token y actualizar el usuario
  const decodeAndSetUser = (jwt) => {
    try {
      const decoded = jwtDecode(jwt);
      const userData = {
        id: decoded.userId,
        email: decoded.email,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        birthday: decoded.birthday,
        address: decoded.address,
        roles: decoded.roles
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
  };
  // Guardar token y usuario en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      decodeAndSetUser(token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);
  // Manejar login
  const login = (authData) => {
    setToken(authData.token);
    decodeAndSetUser(authData.token);
  };
  // Manejar logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <AuthenticationContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
