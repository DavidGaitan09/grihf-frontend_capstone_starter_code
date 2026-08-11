import React from "react";
import { useNotification } from "../context/NotificationContext.jsx";

export default function Notification() {
  const { notifications, dismiss } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div key={n.id} className={`notification notification-${n.type}`}>
          <span>{n.message}</span>
          <button onClick={() => dismiss(n.id)} aria-label="Cerrar notificación">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
