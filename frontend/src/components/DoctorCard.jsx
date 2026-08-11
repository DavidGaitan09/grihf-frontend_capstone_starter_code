import React, { useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useNotification } from "../context/NotificationContext.jsx";

export default function DoctorCard({ doctor, appointment }) {
  const [cancelling, setCancelling] = useState(false);
  const [status, setStatus] = useState(appointment?.status || null);
  const { notify } = useNotification();

  // Cancels an existing appointment tied to this doctor card
  async function handleCancelAppointment() {
    if (!appointment?._id) return;

    setCancelling(true);
    try {
      const { data } = await axiosClient.patch(`/appointments/${appointment._id}/cancel`);
      setStatus(data.status);
      notify("Cita cancelada correctamente", "success");
    } catch (err) {
      notify(err.response?.data?.message || "No se pudo cancelar la cita", "error");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="doctor-card">
      <img
        className="doctor-card-avatar"
        src={doctor.profileImage || "/default-doctor.png"}
        alt={doctor.name}
      />
      <div className="doctor-card-body">
        <h3>{doctor.name}</h3>
        <p className="doctor-card-specialty">{doctor.specialty || "Medicina General"}</p>
        <p>{doctor.email}</p>

        {appointment && (
          <div className="doctor-card-appointment">
            <p>
              Estado: <strong>{status}</strong>
            </p>
            {status !== "cancelled" && (
              <button onClick={handleCancelAppointment} disabled={cancelling}>
                {cancelling ? "Cancelando..." : "Cancelar Cita"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
