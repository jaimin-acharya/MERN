/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  //! LOCAL API URLS
  // const REGISRATION_URL = "http://localhost:5000/api/auth/register";
  // const LOGIN_URL = "http://localhost:5000/api/auth/login";
  // const CONTACT_URL = "http://localhost:5000/api/form/contact";
  // const USER_URL = "http://localhost:5000/api/auth/user";
  // const SERVICE_URL = "http://localhost:5000/api/data/service";
  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  // LOGOUT LOGIC
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - TO GET LOGGEDIN USER DATA

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("user data ", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  //? TO FETCH SERVICES DATA FROM DATABASE
  const getServiceData = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.msg);
        setServices(data.msg);
      } else {
        console.error("Error fetching Service data");
      }
    } catch (error) {
      console.error("Error fetching Service data", error);
    }
  };

  useEffect(() => {
    getServiceData();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          storeTokenInLS,
          LogoutUser,
          user,
          services,
          authorizationToken,
          API,
          isLoading
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("used useAuth outside of the provider.");
  }
  return authContextValue;
};
