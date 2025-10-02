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
     <div className="overflow-x-auto ">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-lg font-semibold text-gray-700">
            <th className="p-3">Stagiaires</th>
            <th className="p-3">Taux de présence</th>
            <th className="p-3 text-center">Présence</th>
            <th className="p-3 text-center">Retard</th>
            <th className="p-3 text-center">Absences</th>
          </tr>
        </thead>
        <tbody>
          {trainees.length > 0 ? (
            trainees.map((t, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-white" : "bg-gray-200"}
              >
                {/* Stagiaire */}
                 <td
  className="p-3 flex items-center gap-3 cursor-pointer "
  onClick={() => handleOpenSummary(t)}
>
  <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full" />
  <div className="flex flex-col">
    <span className="font-medium text-gray-800">{t.name}</span>
    <span className="text-xs text-gray-500 italic">{t.email}</span>
  </div>
</td>

                {/* Taux de présence */}
                <td className="p-3 cursor-pointer" onClick={() => handleOpenSummary(t)}>
                  <span className="text-sm">{t.tauxPresence}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${t.tauxPresence}%` }}
                    ></div>
                  </div>
                </td>

               {/* Présence 🟩 */}
                <td className="p-3 text-centercursor-pointer" onClick={() => handleOpenSummary(t)}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-teal-600 rounded-sm"></div>
                    <span className="text-green-700 font-semibold">
                      {t.present}
                    </span>
                  </div>
                </td>
                {/* Retard 🟨 */}
                <td className="p-3 text-center cursor-pointer" onClick={() => handleOpenSummary(t)}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                    <span className="text-yellow-700 font-semibold">
                      {t.retard}
                    </span>
                  </div>
                </td>
                 {/* Absences 🟥 */}
                <td className="p-3 text-center cursor-pointer" onClick={() => handleOpenSummary(t)}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                    <span className="text-red-700 font-semibold">
                      {t.absences}
                    </span>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Aucun stagiaire trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
