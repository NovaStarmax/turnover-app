import { createContext, useContext, useState, useEffect } from "react";
import api, { parseToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/users/me")
        .then((res) => {
          const tokenPayload = parseToken(token);
          setUser({
            ...res.data,
            service: tokenPayload?.service ?? null,
          });
        })
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data.access_token;
    localStorage.setItem("token", token);

    const meRes = await api.get("/users/me");
    const tokenPayload = parseToken(token);

    const fullUser = {
      ...meRes.data,
      service: tokenPayload?.service ?? null,
    };

    setUser(fullUser);
    return fullUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}
