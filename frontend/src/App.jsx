import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AvailableSessions from "./pages/AvailableSessions";
import SessionManager from "./pages/SessionManager";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

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
        <Navbar /> {/* Use the Navbar component here */}
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
