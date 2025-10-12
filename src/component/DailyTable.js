import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MessageSquareDot } from "lucide-react";
import ModalMessage from "./ModalMessage";
import SanctionSummaryModal from "./DetailPointageModal";

export default function DailyCardList() {
  const clockRecords = useSelector((state) => state.clock?.records || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  const openModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);

  const handleOpenSummary = (record) => {
    setSummaryData({
      name: record.name,
      email: record.email,
      image: record.image || "https://i.pravatar.cc/60",
      avertissement: record.present || 0,
      blame: record.absence || 0,
      suspension: record.retard || 0,
    });
    setShowSummaryModal(true);
  };

  return (
    <div className="mt-6 space-y-3">
      {/* En-tête du tableau */}
      <div className="grid grid-cols-5 gap-6 px-6 py-3 font-bold text-gray-900 text-base">
        <span>Stagiaire</span>
        <span>Heure du pointage</span>
        <span>Date</span>
        <span>Statut</span>
        <span className="text-right">Action</span>
      </div>

      {/* Liste des lignes */}
      {clockRecords.length > 0 ? (
        clockRecords.map((r, index) => {
          const statusLower = r.status?.trim().toLowerCase();

          return (
            <div
              key={r.id || index}
              className="grid grid-cols-5 gap-6 items-center bg-white border-2 border-gray-200 rounded-2xl px-2 py-1 hover:bg-gray-50 transition-colors"
            >
              {/* Colonne Stagiaire - Photo + Nom + Email */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleOpenSummary(r)}
              >
                <img
                  src={r.image || "https://i.pravatar.cc/80"}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-base">
                    {r.name}
                  </span>
                  <span className="text-sm text-gray-500">{r.email}</span>
                </div>
              </div>

              {/* Colonne Heure */}
              <div
                className="text-gray-900 font-semibold text-base cursor-pointer"
                onClick={() => handleOpenSummary(r)}
              >
                {r.time || "—"}
              </div>

              {/* Colonne Date */}
              <div
                className="text-gray-900 font-semibold text-base cursor-pointer"
                onClick={() => handleOpenSummary(r)}
              >
                {r.date || new Date().toLocaleDateString("fr-FR")}
              </div>

              {/* Colonne Statut avec badge arrondi */}
              <div
                className="cursor-pointer"
                onClick={() => handleOpenSummary(r)}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                    statusLower === "a l'heure" || statusLower === "à l'heure"
                      ? "bg-teal-600 text-white"
                      : statusLower === "en retard"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {statusLower === "a l'heure" || statusLower === "à l'heure"
                    ? "A l'heure"
                    : statusLower === "en retard"
                    ? "En retard"
                    : r.status}
                </span>
              </div>

              {/* Colonne Action - Alignée à droite */}
              <div className="flex justify-end">
                {statusLower === "en retard" ? (
                  <button
                    onClick={() => openModal(r)}
                    className="w-8 h-8 flex items-center justify-center 
                               rounded-lg border-2 border-orange-100 bg-white 
                               hover:bg-orange-50 cursor-pointer transition-colors
                               relative"
                  >
                    <MessageSquareDot className="w-6 h-6 text-orange-500" />
                    {/* Point de notification */}
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 
                                 bg-orange-500 rounded-full border-2 border-white"
                    ></span>
                  </button>
                ) : (
                  <div className="w-12 h-12"></div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 bg-gray-50 p-8 rounded-2xl">
          Aucun stagiaire trouvé pour cette date.
        </div>
      )}

      {/* Modals */}
      {selectedUser && <ModalMessage user={selectedUser} onClose={closeModal} />}
      {showSummaryModal && (
        <SanctionSummaryModal
          open={true}
          onClose={() => setShowSummaryModal(false)}
          data={summaryData}
        />
      )}
    </div>
  );
}