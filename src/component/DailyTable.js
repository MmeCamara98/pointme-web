import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MessageSquareText } from "lucide-react";
import ModalMessage from "./ModalMessage";
import SanctionSummaryModal from "./DetailPointageModal";

export default function DailyTable() {
  const clockRecords = useSelector((state) => state.clock?.records || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const openModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);
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
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="p-3">Stagiaire</th>
            <th className="p-3">Heure de Pointage</th>
            <th className="p-3">Date</th>
            <th className="p-3">Statut</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {clockRecords.length > 0 ? (
            clockRecords.map((r, index) => {
              // ✅ On compare en minuscule mais on garde l'affichage original
              const statusLower = r.status?.trim().toLowerCase();

              return (
                <tr
                  key={r.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } `} 
                >
                  {/* Nom et avatar */}
                  
                   <td
  className="p-3 flex items-center gap-3 cursor-pointer "
  onClick={() => handleOpenSummary(r)}
>
  <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full" />
  <div className="flex flex-col">
    <span className="font-medium text-gray-800">{r.name}</span>
    <span className="text-xs text-gray-500 italic">{r.email}</span>
  </div>
</td>

                  {/* Heure */}
                  <td className="p-3 text-gray-700 cursor-pointer" onClick={() => handleOpenSummary(r)}>
                    {r.time || "—"}
                  </td>

                  {/* Date du jour */}
                  <td className="p-3 text-gray-700 cursor-pointer" onClick={() => handleOpenSummary(r)}>
                    {new Date().toLocaleDateString("fr-FR")}
                  </td>

                  {/* Statut */}
                  <td className="p-3 cursor-pointer" onClick={() => handleOpenSummary(r)}>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusLower === "a l'heure"
                          ? "bg-teal-600 text-white"
                          : statusLower === "en retard"
                          ? "bg-orange-400 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {/* ✅ Affiche exactement ce qui vient de la BDD/Redux (ex: "A l'heure", "En retard") */}
                      {r.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3 text-gray-600 whitespace-nowrap">
                    {statusLower === "en retard" && (
                      <div
                        onClick={() => openModal(r)}
                        className="relative w-10 h-10 flex items-center justify-center 
                                   rounded-lg border border-orange-500 bg-white 
                                   hover:bg-orange-50 cursor-pointer "
                      >
                        <MessageSquareText className="w-6 h-6 text-orange-500" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 
                                         bg-orange-500 rounded-full border border-red"></span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500 italic">
                Aucun stagiaire trouvé pour cette date.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal d'envoi de message */}
      {selectedUser && (
        <ModalMessage user={selectedUser} onClose={closeModal} />
      )}
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
