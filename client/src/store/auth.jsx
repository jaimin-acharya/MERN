/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  //! LOCAL API URLS
  const REGISRATION_URL = "http://localhost:5000/api/auth/register";
  const LOGIN_URL = "http://localhost:5000/api/auth/login";
  const CONTACT_URL = "http://localhost:5000/api/form/contact";
  const USER_URL = "http://localhost:5000/api/auth/user";
  const SERVICE_URL = "http://localhost:5000/api/data/service";

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
      const response = await fetch(USER_URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("user data ", data.userData);
        setUser(data.userData);
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
      const response = await fetch(SERVICE_URL, { method: "GET" });

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
          REGISRATION_URL,
          LOGIN_URL,
          CONTACT_URL,
          USER_URL,
          SERVICE_URL,
          user,
          services,
          authorizationToken,
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
