import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

export default function Sign_Up() {
  const [form, setForm] = useState({
    role: "patient",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Invokes the registration API to register a new user
  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notify("Las contraseñas no coinciden", "error");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosClient.post("/auth/register", {
        role: form.role,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      login(data.token, data.user);
      notify("Cuenta creada exitosamente", "success");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Error al registrar el usuario";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Crear Cuenta</h1>

        <label htmlFor="role">Rol</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="patient">Paciente</option>
          <option value="doctor">Doctor</option>
        </select>

        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+57 300 000 0000"
          value={form.phone}
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
          minLength={6}
        />

        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
      </form>
    </div>
  );
}
