import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import SanctionSummaryModal from "./DetailPointageModal";

export default function TraineeTable() {
  const trainees = useSelector((state) => state.trainee.trainees || []);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  
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
    <div className="overflow-x-auto">
      {/* En-têtes du tableau */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 font-bold text-gray-900 text-base mb-2">
        <div>Stagiaire</div>
        <div>Taux de présence</div>
        <div className="text-center">Present</div>
        <div className="text-center">Retards</div>
        <div className="text-center">Absences</div>
      </div>

      {/* Corps du tableau */}
      <div className="space-y-3">
        {trainees.length > 0 ? (
          trainees.map((t, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center px-2 py-1 bg-gray-100 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleOpenSummary(t)}
            >
              {/* Stagiaire - Photo + Nom + Email */}
              <div className="flex items-center gap-3">
                <img
                  src={"https://i.pravatar.cc/60"}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-base">
                    {t.name}
                  </span>
                  <span className="text-sm text-gray-500">{t.email}</span>
                </div>
              </div>

              {/* Taux de présence avec barre de progression */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900 text-base">
                    {t.tauxPresence}%
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className="bg-teal-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${t.tauxPresence}%` }}
                  ></div>
                </div>
              </div>

              {/* Présence avec carré teal */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-teal-600 rounded"></div>
                <span className="text-gray-900 font-semibold text-base">
                  {t.present}
                </span>
              </div>

              {/* Retards avec carré orange */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-900 font-semibold text-base">
                  {t.retard}
                </span>
              </div>

              {/* Absences avec carré rouge */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-900 font-semibold text-base">
                  {t.absences}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            Aucun stagiaire trouvé
          </div>
        )}
      </div>

      {/* Modal */}
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