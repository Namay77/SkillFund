import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AvailableSessions from "./pages/AvailableSessions";
import SessionManager from "./pages/SessionManager";
import NotFound from "./pages/NotFound";
import "./styles/navbar.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          {" "}
          {/* Navigation bar */}
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/mysessions" className="nav-link">
            My Sessions
          </NavLink>
          <NavLink to="/logout" className="nav-link">
            Logout
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AvailableSessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mysessions"
            element={
              <ProtectedRoute>
                <SessionManager />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
