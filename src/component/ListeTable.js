import React from "react";

import { useSelector } from "react-redux";
import { useState } from "react";
import AbsenceModal from "./AbsenceModal";
import SanctionEditModal from "./SanctionFormModal";
import JustificationModal from "./JustificationModal";
import RetardModal from "./JustificationModalRetard";
import SanctionSummaryModal from "./DetailPointageModal";


export default function ListeTableau({ onDelete }) {
  const dailyRecords = useSelector(
    (state) => state.dailyPresence?.dailyRecords || []
  );
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [selectedSanction, setSelectedSanction] = useState(null);
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRetardModal, setShowRetardModal] = useState(false);
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
            <th className="p-3">Statut</th>
            <th className="p-3">Arrivée</th>
            <th className="p-3">Sortie</th>
            <th className="p-3">Notes</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {dailyRecords.length > 0 ? (
            dailyRecords.map((r, index) => (
              <tr
                key={r.id || index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100 rounded-md"
                } `}
              >
                {/* Stagiaire */}
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

                {/* Statut */}
                <td
  className="p-3 whitespace-nowrap cursor-pointer "
  onClick={() => handleOpenSummary(r)}
>
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
    r.status === "Present" ? "bg-green-100 text-green-700"
    : r.status === "Retard" ? "bg-orange-100 text-orange-600"
    : "bg-red-100 text-red-700"
  }`}>
    {r.status}
  </span>
</td>

                {/* Arrivée */}
                <td className="p-3 text-gray-700 cursor-pointer " onClick={() => handleOpenSummary(r)}>
                  {r.arrival || "—"}
                </td>

                {/* Sortie */}
                <td className="p-3 text-gray-700 cursor-pointer" onClick={() => handleOpenSummary(r)}>
                  {r.departure || "—"}
                </td>

                {/* Notes */}
                <td className="p-3 text-gray-700 cursor-pointer" onClick={() => handleOpenSummary(r)}>
                  {r.notes || "—"}
                </td>

                {/* Action */}
                <td className="p-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    {/* ❓ Carré rouge avec ? */}
                    {r.status === "Present" && (
                    <button
                      onClick={() => setShowAbsenceModal(true)}
                      className="w-8 h-8 flex items-center justify-center border border-red-500 rounded-md bg-white"
                    >
                      <span className="text-red-500 font-bold text-lg">?</span>
                    </button>
                  )}
                    {/* Document rouge si Absent */}
{r.status === "Absent" && (
  <button
    onClick={() => {
      setSelectedRecord(r);
      setShowJustificationModal(true);
    }}
    className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M7 4h10v16H7z" />
      <path d="M7 4l5 5h5" />
    </svg>
  </button>
)}

{/* Document orange si Retard */}
{r.status === "Retard" && (
  <button
    onClick={() => {
      setSelectedRecord(r);
      setShowRetardModal(true);
    }}
    className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M7 4h10v16H7z" />
      <path d="M7 4l5 5h5" />
    </svg>
  </button>
)}



                      <button
    onClick={() => setSelectedSanction(r)}
    className="w-8 h-8 flex items-center justify-center border border-red-500 rounded-md bg-white"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  </button>

                    
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                Aucun stagiaire trouvé pour cette date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showAbsenceModal && (
  <AbsenceModal
    open={true}
    onClose={() => setShowAbsenceModal(false)}
    onSend={(msg) => console.log("Message envoyé :", msg)}
  />
)}
{selectedSanction && (
        <SanctionEditModal
          open={true}
          onClose={() => setSelectedSanction(null)}
          initialData={selectedSanction}
        />
        
      )
      }
      {/* Modal pour Absent */}
{showJustificationModal && (
  <JustificationModal
    open={true}
    onClose={() => setShowJustificationModal(false)}
    justification={{
      message: selectedRecord?.notes || "Aucune justification fournie.",
      name: selectedRecord?.name,
      email: selectedRecord?.email,
    }}
    onReply={(msg) => console.log("Réponse :", msg)}
    onValidate={(data) => console.log("Justification validée :", data)}
  />
)}

{/* Modal pour Retard */}
{showRetardModal && (
  <RetardModal
    open={true}
    onClose={() => setShowRetardModal(false)}
    record={selectedRecord}
    onReply={(msg) => console.log("Réponse retard :", msg)}
    onValidate={(data) => console.log("Retard validé :", data)}
    onRefuse={(data) => console.log("Retard refusé :", data)}
  />
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
