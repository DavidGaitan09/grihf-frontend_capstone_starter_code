import React, { useState } from "react";
import FindDoctorSearch from "../components/FindDoctorSearch.jsx";
import AppointmentForm from "../components/AppointmentForm.jsx";
import AppointmentFormIC from "../components/AppointmentFormIC.jsx";

export default function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <section className="appointments-page">
      <h1>Reserva de Citas</h1>

      <FindDoctorSearch onSelectDoctor={setSelectedDoctor} />

      <div className="appointments-forms">
        <AppointmentForm doctorId={selectedDoctor?._id} />
        <AppointmentFormIC />
      </div>
    </section>
  );
}
