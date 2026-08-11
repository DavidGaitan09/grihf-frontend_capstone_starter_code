import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Notification from "./components/Notification.jsx";

import Home from "./pages/Home.jsx";
import Sign_Up from "./pages/Sign_Up.jsx";
import Login from "./pages/Login.jsx";
import Appointments from "./pages/Appointments.jsx";
import Profile from "./pages/Profile.jsx";
import Reviews from "./pages/Reviews.jsx";

export default function App() {
  return (
    <AuthProvider>
      {/* NotificationProvider wraps the whole app so any component can trigger a toast,
          and <Notification /> renders it here once, visible across every page. */}
      <NotificationProvider>
        <Navbar />
        <Notification />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
      </NotificationProvider>
    </AuthProvider>
  );
}
