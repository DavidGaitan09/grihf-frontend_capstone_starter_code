import React, { useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useNotification } from "../context/NotificationContext.jsx";

export default function GiveReviews({ doctorId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // disables the form after submission
  const { notify } = useNotification();

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitted) return;

    setLoading(true);
    try {
      await axiosClient.post("/reviews", { doctor: doctorId, rating, comment });
      notify("¡Gracias por tu reseña!", "success");
      setSubmitted(true); // disable the form after a successful submission
    } catch (err) {
      notify(err.response?.data?.message || "Error al enviar la reseña", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="give-reviews-form" onSubmit={handleSubmit}>
      <h2>Deja tu Reseña</h2>

      <label htmlFor="rating">Calificación</label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        disabled={submitted}
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} estrella{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label htmlFor="comment">Comentario</label>
      <textarea
        id="comment"
        placeholder="Cuéntanos tu experiencia..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={submitted}
        required
      />

      <button type="submit" disabled={loading || submitted}>
        {submitted ? "Reseña Enviada" : loading ? "Enviando..." : "Enviar Reseña"}
      </button>

      {submitted && <p className="give-reviews-thanks">¡Gracias por compartir tu opinión!</p>}
    </form>
  );
}
