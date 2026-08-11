import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-hero">
      <h1>MediCare Connect</h1>
      <p className="home-tagline">Tu salud, a una cita de distancia.</p>
      <p className="home-description">
        Encuentra doctores, reserva citas médicas en línea y gestiona tu historial de
        salud desde un solo lugar.
      </p>

      <nav className="home-nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/appointments">Citas</Link>
        <Link to="/signup">Registrarse</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </nav>
    </section>
  );
}
