import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Invokes the login authentication API to authenticate the user
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      login(data.token, data.user);
      notify(`Bienvenido, ${data.user.name}`, "success");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Credenciales inválidas";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <p>
          ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}
