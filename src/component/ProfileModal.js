import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Settings, SquarePen } from "lucide-react";

export default function ProfileModal({ open, onClose, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!open) return null;

  return (
    // Le parent doit être positionné en relatif pour que le modal soit positionné en bas du profil
    <div className="absolute top-full mt-3 right-0 z-50 w-50">
      <div className="bg-white rounded-3xl shadow-2xl ww-[100px] md:w-[350px] overflow-hidden border border-gray-200">
        {/* En-tête avec photo et infos */}
        <div className="p-4 pb-2">
          <div className="flex items-start gap-3">
            {/* Photo de profil */}
            <div className="relative">
              <img
                src={user?.image || "https://i.pravatar.cc/120"}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
              />
            </div>

            {/* Infos + bouton changer */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.name || "Mbaye Seck"}
                </h2>
                <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <SquarePen size={12} />
                  Changer
                </button>
              </div>

              <p className="text-gray-600 text-xl mb-2">
                {user?.role || "Développement Full stack"}
              </p>

              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full">
                  Coach
                </span>
                <button className="w-8 h-8 flex items-center justify-center  rounded-full hover:bg-gray-50 transition-colors">
                  <Settings size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200"></div>

        {/* Informations de contact */}
        <div className="p-4 space-y-3">
          {/* Email */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-white" />
              </div>
              <span className="text-gray-800 text-xl font-medium">
                {user?.email || "Mbayeseck21@gmail.com"}
              </span>
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 mb-1">Téléphone</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-white" />
              </div>
              <span className="text-gray-800 text-xl font-medium">
                {user?.phone || "+221 78 234 55 66"}
              </span>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200"></div>

        {/* Bouton Déconnexion */}
        <div className="p-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="w-50 px-4 py-2 bg-red-500 text-white text-xl font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors shadow-md"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
