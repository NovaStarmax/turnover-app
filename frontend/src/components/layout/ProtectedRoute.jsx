import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Le contexte vérifie localStorage au démarrage
  // On attend que cette vérification soit terminée
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  // Pas connecté → redirect login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Connecté → on affiche la page
  return children;
}
