import React, { useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useNotification } from "../context/NotificationContext.jsx";

// Instant Consultation appointment form: only Name and Phone Number fields
export default function AppointmentFormIC() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post("/appointments", form);
      notify("Solicitud de consulta enviada", "success");
      setForm({ name: "", phone: "" });
    } catch (err) {
      notify(err.response?.data?.message || "Error al enviar la solicitud", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="appointment-form-ic" onSubmit={handleSubmit}>
      <h2>Consulta Rápida</h2>

      <label htmlFor="ic-name">Nombre</label>
      <input
        id="ic-name"
        name="name"
        type="text"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="ic-phone">Número de Teléfono</label>
      <input
        id="ic-phone"
        name="phone"
        type="tel"
        placeholder="+57 300 000 0000"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Solicitar Contacto"}
      </button>
    </form>
  );
}
