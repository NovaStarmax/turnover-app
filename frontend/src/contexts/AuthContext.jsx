import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

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
      // Token trouvé → on récupère l'utilisateur courant
      api
        .get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          // Token invalide ou expiré → on nettoie
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Appel API login
    const res = await api.post("/auth/login", { email, password });

    // Stocke le token dans localStorage
    localStorage.setItem("token", res.data.access_token);

    // Récupère l'utilisateur complet
    const meRes = await api.get("/users/me");
    setUser(meRes.data);

    return meRes.data; // retourné à celui qui appelle login()
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
