import { createContext, useContext, useState, useEffect } from "react";
import api, { parseToken } from "@/lib/api";

// 1. Création du contexte — c'est juste un conteneur vide pour l'instant
const AuthContext = createContext(null);

// 2. Le Provider — le composant qui va envelopper toute l'app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app — on vérifie si un token existe déjà
  // (cas où l'utilisateur a déjà été connecté et revient sur l'app)
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

    // Récupère l'utilisateur + enrichit avec service depuis le token
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

  // 3. On expose ce dont les composants ont besoin
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Hook custom — pour consommer le contexte proprement
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}
