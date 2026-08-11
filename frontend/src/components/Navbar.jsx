import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  // Logout functionality: clears the session and redirects home
  function handleLogout() {
    logout();
    notify("Sesión cerrada correctamente", "success");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        MediCare Connect
      </Link>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/appointments">Cita</Link>
        <Link to="/reviews">Reseñas</Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile">{user?.name || "Mi Perfil"}</Link>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/signup" className="navbar-cta">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
