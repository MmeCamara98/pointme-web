import React from "react";
import { useNavigate } from "react-router-dom";


export default function ProfileModal({ open, onClose, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionnel : vider le token ou session ici
    localStorage.removeItem("authToken"); // si tu utilises un token
    navigate("/login"); // redirection vers la page de login
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border w-full max-h-[70vh] overflow-y-auto p-4 z-50">
      {/* Photo + nom + bouton Changer */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.image || "https://i.pravatar.cc/100"}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover bg-yellow-400"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.name || "Mbaye Seck"}
          </h2>
          <p className="text-sm text-gray-600">Développement Full stack</p>
          <span className="inline-block mt-1 px-3 py-1 bg-green-600 text-white text-xs rounded-full">
            Coach
          </span>
        </div>

        {/* Bouton changer aligné à droite */}
        <button className="ml-auto px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 mb-6">
          Changer
        </button>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-800">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4z" />
            <path d="M4 4l8 8 8-8" />
          </svg>
          {user?.email || "Mbayeseck21@gmail.com"}
        </div>
      </div>

      {/* Téléphone */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Téléphone</label>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-800">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M3 5h18v14H3z" />
            <path d="M8 5v14M16 5v14" />
          </svg>
          {user?.phone || "+221 78 234 55 66"}
        </div>
      </div>

      {/* Bouton Déconnexion */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 justify-center"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
