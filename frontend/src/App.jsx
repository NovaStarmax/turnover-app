import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Administration from "./pages/Administration";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* RH_ADMIN + RH_STANDARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["RH_ADMIN", "RH_STANDARD"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Tous les rôles */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />

          {/* RH_ADMIN seulement */}
          <Route
            path="/administration"
            element={
              <ProtectedRoute roles={["RH_ADMIN"]}>
                <Administration />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
