import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );

  if (!user) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.role)) {
    if (user.role === "MANAGER") return <Navigate to="/employees" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
