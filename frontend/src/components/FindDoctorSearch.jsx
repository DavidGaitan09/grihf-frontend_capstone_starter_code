import React, { useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useNotification } from "../context/NotificationContext.jsx";
import DoctorCard from "./DoctorCard.jsx";

export default function FindDoctorSearch() {
  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  // Implements the doctor search functionality within the Appointment Booking component
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/doctors", {
        params: { query },
      });
      setDoctors(data);
      if (data.length === 0) {
        notify("No se encontraron doctores para tu búsqueda", "info");
      }
    } catch (err) {
      notify(err.response?.data?.message || "Error al buscar doctores", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="find-doctor-search">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <div className="doctor-results">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
