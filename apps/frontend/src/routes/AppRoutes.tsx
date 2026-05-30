import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
