import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AlertTriangle, FileText } from "lucide-react";
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
    <>
      {/* Titre */}
      <div className="mb-4 mt-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Liste des pointages
        </h2>
      </div>

      {/* En-têtes du tableau */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-600 mb-2">
        <div className="col-span-3">Stagiaire</div>
        <div className="col-span-2">Statut</div>
        <div className="col-span-2">Arrivée</div>
        <div className="col-span-2">Sortie</div>
        <div className="col-span-2">Notes</div>
        <div className="col-span-1">Action</div>
      </div>

      {/* Lignes du tableau - Cartes */}
      <div className="space-y-3">
        {dailyRecords.length > 0 ? (
          dailyRecords.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 px-1 py-1 "
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Stagiaire */}
                <div
                  className="col-span-3 flex items-center gap-3 cursor-pointer"
                  onClick={() => handleOpenSummary(r)}
                >
                  <img
                    src={ "https://i.pravatar.cc/50"}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-base">
                      {r.name}
                    </span>
                    <span className="text-sm text-gray-500">{r.email}</span>
                  </div>
                </div>

                {/* Statut */}
                <div
                  className="col-span-2 cursor-pointer"
                  onClick={() => handleOpenSummary(r)}
                >
                  <span
                    className={`inline-block px-2 py-1 rounded-2xl text-xs font-medium ${
                      r.status === "Present"
                        ? "bg-green-200 text-green-700 "
                        : r.status === "Retard"
                        ? "bg-orange-200 text-orange-700 "
                        : "bg-red-200 text-red-700 "
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                {/* Arrivée */}
                <div
                  className="col-span-2 cursor-pointer"
                  onClick={() => handleOpenSummary(r)}
                >
                  <span className="text-gray-900 font-medium text-base">
                    {r.arrival || "—"}
                  </span>
                </div>

                {/* Sortie */}
                <div
                  className="col-span-2 cursor-pointer"
                  onClick={() => handleOpenSummary(r)}
                >
                  <span className="text-gray-900 font-medium text-base">
                    {r.departure || "—"}
                  </span>
                </div>

                {/* Notes */}
                <div
                  className="col-span-2 cursor-pointer"
                  onClick={() => handleOpenSummary(r)}
                >
                  <span className="text-gray-700 text-sm">
                    {r.notes || "—"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center gap-2 justify-end">
                  {/* Bouton Question (Présent) */}
                  {r.status === "Present" && (
                    <button
                      onClick={() => setShowAbsenceModal(true)}
                      className="w-8 h-8 flex items-center justify-center border-2 border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                      title="Signaler un problème"
                    >
                      <span className="text-red-500 font-bold text-xl">?</span>
                    </button>
                  )}

                  {/* Bouton Document (Absent) */}
                  {r.status === "Absent" && (
                    <button
                      onClick={() => {
                        setSelectedRecord(r);
                        setShowJustificationModal(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                      title="Voir justification"
                    >
                      <FileText className="w-5 h-5 text-white" />
                    </button>
                  )}

                  {/* Bouton Document (Retard) */}
                  {r.status === "Retard" && (
                    <button
                      onClick={() => {
                        setSelectedRecord(r);
                        setShowRetardModal(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                      title="Voir justification retard"
                    >
                      <FileText className="w-5 h-5 text-white" />
                    </button>
                  )}

                  {/* Bouton Sanction (Triangle) */}
                  <button
                    onClick={() => setSelectedSanction(r)}
                    className="w-8 h-8 flex items-center justify-center border-2 border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                    title="Appliquer une sanction"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-16 text-center">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500 font-medium text-lg">
                Aucun stagiaire trouvé pour cette date.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
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
      )}

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
    </>
  );
}