 "use client";
import { authKey } from "@/contants/storageKey";
import { AuthContext } from "@/context/context";
import { getToken } from "@/services/auth.services";
import { BASE_URL } from "@/utils/baseURL";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  useEffect(() => {
    setLoading(true);
    if (token) {
      fetch(`${BASE_URL}/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } else setLoading(false);
  }, [token]);

  useEffect(() => {
    const getOrder = JSON.parse(sessionStorage.getItem("order-track"));
    if (getOrder) {
      setOrder(getOrder);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(authKey);
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    logout: handleLogout,
    setUser,
    order,
    setOrder,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
