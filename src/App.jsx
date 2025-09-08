import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Statistics from "./pages/Statistics";

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="/s/:code" element={<RedirectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}
