import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import axiosClient from "../api/axiosClient.js";

export default function ProfileCard() {
  const { user, login } = useAuth();
  const { notify } = useNotification();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Example endpoint; adjust to your real "update profile" route
      const { data } = await axiosClient.put("/users/me", form);
      login(localStorage.getItem("token"), data.user);
      notify("Perfil actualizado correctamente", "success");
      setEditing(false);
    } catch (err) {
      notify(err.response?.data?.message || "Error al actualizar el perfil", "error");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <div className="profile-card">
      {!editing ? (
        // Profile card UI (read-only view)
        <div className="profile-card-view">
          <img
            className="profile-card-avatar"
            src={user.profileImage || "/default-avatar.png"}
            alt={user.name}
          />
          <h2>{user.name}</h2>
          <p className="profile-card-role">{user.role}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <button onClick={() => setEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        // Edit form
        <form className="profile-card-edit-form" onSubmit={handleSave}>
          <label htmlFor="pc-name">Nombre</label>
          <input id="pc-name" name="name" value={form.name} onChange={handleChange} required />

          <label htmlFor="pc-email">Correo Electrónico</label>
          <input
            id="pc-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="pc-phone">Teléfono</label>
          <input id="pc-phone" name="phone" value={form.phone} onChange={handleChange} required />

          <div className="profile-card-edit-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
