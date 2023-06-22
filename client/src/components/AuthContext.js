import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    null || window.localStorage.getItem("token")
  );
  const [authTokenType, setAuthTokenType] = useState(
    null || window.localStorage.getItem("tokentype")
  );

  const login = (token, type) => {
    setAuthToken(token);
    setAuthTokenType(type);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("tokentype", type);
  };

  const logout = () => {
    setAuthToken(null);
    setAuthTokenType(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokentype");
  };

  return (
    <AuthContext.Provider value={{ authToken, authTokenType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
