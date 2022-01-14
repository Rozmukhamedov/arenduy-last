import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useCustomFetcher from "../hooks/useCustomFetcher";
import { assign } from "lodash";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["tokens"]);
  const [loading, setLoading] = useState(true);

  const [tokenError, tokenLoading, tokenFetcher] = useCustomFetcher();

  const navigate = useNavigate();

  const signin = (cb) => {
    cb();
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    removeCookie("tokens");
    console.log("loguot");
    navigate("/");
  };

  const updateToken = () => {
    console.log("updated");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: cookies?.tokens?.refresh,
      }),
    };

    if (cookies?.tokens?.refresh != undefined) {
      tokenFetcher(
        (response) => {
          if (response?.detail != "Token is invalid or expired") {
            assign(response, {
              refresh: `${cookies?.tokens?.refresh}`,
              id: `${cookies?.tokens?.id}`,
            });
            setCookie("tokens", response);
            setIsLoggedIn(true);
          } else {
            logoutUser();
            setLoading(false);
          }
        },
        `https://rent-vlk.herokuapp.com/accounts/token/refresh/`,
        requestOptions
      );
    }

    setLoading(false);
  };

  const value = {
    signin,
    setIsLoggedIn,
    isLoggedIn,
    cookies,
    setCookie,
    removeCookie,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let Minutes = 1000 * 60 * 2;

    let interval = setInterval(() => {
      if (cookies) {
        updateToken();
      }
    }, Minutes);
    return () => clearInterval(interval);
  }, [cookies, loading]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
