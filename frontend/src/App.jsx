import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Predict from "@/pages/Predict";
import History from "@/pages/History";
import About from "@/pages/About";

// Layout
import RootLayout from "@/components/layout/RootLayout";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* ALL routes inside RootLayout so navbar always shows */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/predict"
          element={<Predict />}
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
