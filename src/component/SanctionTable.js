import React, { useState } from "react";
import { Trash2, Edit, ExternalLink,SquarePen } from "lucide-react";
import SanctionEditModal from "./ModifierSanction";
import SanctionSummaryModal from "./SanctionSummaryModal";

export default function SanctionTable({ sanctions = [], onDelete }) {
  const [selectedSanction, setSelectedSanction] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState({
    avertissement: 0,
    blame: 0,
    suspension: 0,
  });

  const handleOpenSummary = (s) => {
    setSummaryData({
      name: s.name,
      email: s.email,
      image: s.image,
      avertissement: s.avertissement,
      blame: s.blame,
      suspension: s.suspension,
    });
    setShowSummary(true);
  };

  return (
    <>

      {/* En-têtes du tableau */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-600 mb-2">
        <div className="col-span-3">Stagiaire</div>
        <div className="col-span-3">Motif</div>
        <div className="col-span-2">Niveau</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Statue</div>
        <div className="col-span-1">Action</div>
      </div>

      {/* Lignes du tableau */}
      <div className="space-y-3">
        {sanctions.length > 0 ? (
          sanctions.map((s) => (
            <div
              key={s.id}className="bg-white rounded-2xl shadow-sm border border-gray-200 px-1 py-1
               "
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Stagiaire */}
                <div
                  className="col-span-3 flex items-center gap-3 cursor-pointer"
                  onClick={() => handleOpenSummary(s)}
                >
                  <img
                    src={ "https://i.pravatar.cc/50"}
                    alt={s.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-base">
                      {s.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {s.email}
                    </span>
                  </div>
                </div>

                {/* Motif */}
                <div
                  className="col-span-3 cursor-pointer"
                  onClick={() => handleOpenSummary(s)}
                >
                  <div className="font-semibold text-gray-900 text-base mb-0.5">
                    {s.motif}
                  </div>
                  <div className="text-sm text-gray-500">
                    {s.description}
                  </div>
                </div>

                {/* Niveau */}
                <div className="col-span-2">
                  <button
                    onClick={() => handleOpenSummary(s)}
                    className="bg-white text-yellow-800 text-xs font-medium border border-orange-300 rounded-2xl px-2 py-0.5  "
                  >
                    {s.niveau}
                  </button>
                </div>

                {/* Date */}
                <div
                  className="col-span-2 cursor-pointer"
                  onClick={() => handleOpenSummary(s)}
                >
                  <span className="text-gray-900 font-medium text-base">
                    {s.date}
                  </span>
                </div>

                {/* Statut */}
                <div className="col-span-1">
                  <button
                    onClick={() => handleOpenSummary(s)}
                    className="bg-red-500 text-white text-sm font-medium rounded-xl px-0.5 py-0.5  transition-colors w-20"
                  >
                    {s.statut}
                  </button>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center gap-2 justify-end">
                  {/* Bouton Éditer/Ouvrir */}
                  <button
                    onClick={() => setSelectedSanction(s)}
                    className="w-8 h-8 flex items-center justify-center border-2 border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Modifier"
                  >
                    <SquarePen className="w-5 h-5 text-gray-900" />
                  </button>

                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => onDelete && onDelete(s.id)}
                    className="w-8 h-8 flex items-center justify-center border-2 border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500 font-medium text-lg">
                Aucune sanction trouvée.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de modification */}
      {selectedSanction && (
        <SanctionEditModal
          open={true}
          onClose={() => setSelectedSanction(null)}
          initialData={selectedSanction}
        />
      )}

      {/* Modal de résumé */}
      {showSummary && (
        <SanctionSummaryModal
          open={true}
          onClose={() => setShowSummary(false)}
          data={summaryData}
        />
      )}
    </>
  );
}