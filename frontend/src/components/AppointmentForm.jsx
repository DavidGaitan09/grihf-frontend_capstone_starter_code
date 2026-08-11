import React, { useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useNotification } from "../context/NotificationContext.jsx";

// Full appointment form: Name, Phone Number, Date and Time
export default function AppointmentForm({ doctorId }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
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
      await axiosClient.post("/appointments", { ...form, doctor: doctorId });
      notify("Cita agendada correctamente", "success");
      setForm({ name: "", phone: "", date: "", time: "" });
    } catch (err) {
      notify(err.response?.data?.message || "Error al agendar la cita", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h2>Agendar Cita</h2>

      <label htmlFor="af-name">Nombre</label>
      <input
        id="af-name"
        name="name"
        type="text"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="af-phone">Número de Teléfono</label>
      <input
        id="af-phone"
        name="phone"
        type="tel"
        placeholder="+57 300 000 0000"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <label htmlFor="af-date">Fecha</label>
      <input
        id="af-date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="af-time">Hora</label>
      <input
        id="af-time"
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Agendando..." : "Confirmar Cita"}
      </button>
    </form>
  );
}
