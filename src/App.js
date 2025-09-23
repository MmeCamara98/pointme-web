import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import QRcode from "./pages/QRcode";
import Sanction from "./pages/SanctionPage";
import Liste from "./pages/ListePointage";
import Profil from "./pages/Profil";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/QRcode" element={<QRcode />}/>
        <Route path="/sanction" element={<Sanction/>}/>
        <Route path="/liste" element={<Liste/>}/>
        <Route path="/profil" element={<Profil/>}/>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
