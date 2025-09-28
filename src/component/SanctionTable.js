import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import SanctionEditModal from "./ModifierSanction"; // ton modal de modification
import SanctionSummaryModal from "./SanctionSummaryModal";


export default function SanctionTable({ sanctions = [], onDelete }) {
  const [selectedSanction, setSelectedSanction] = useState(null);
 const [showSummary, setShowSummary] = useState(false);
const [summaryData, setSummaryData] = useState({
  avertissement: 0,
  blame: 0,
  suspension: 0,
});


  return (
    <>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="text-left text-sm text-gray-700">
            <th className="p-2">Stagiaire</th>
            <th className="p-2">Motif</th>
            <th className="p-2">Niveau</th>
            <th className="p-2">Date</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sanctions.length > 0 ? (
            sanctions.map((s, index) => (
              <tr
                key={s.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {/* Stagiaire */}
                <td className="p-3 flex items-center gap-2">
                 <img
                      src="https://i.pravatar.cc/40"
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  <span className="font-medium text-gray-800">{s.name}</span>
                  <div className="text-xs text-gray-500 italic">{s.email}</div>
                </td>

                {/* Motif */}
                <td className="p-2">
                  <div className="text-sm font-semibold text-gray-800 mb-1 ">
                    {s.motif}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {s.description}
                  </div>
                </td>

                <td className="p-2">
                  <div className="bg-white text-black text-xs text-center border border-orange-400 rounded-xl w-22">
                    {s.niveau}
                  </div>

                </td>
                <td className="p-2">{s.date}</td>
                <td className="p-2 text-red-600 font-semibold">
                  <div className="bg-red-600 text-white text-xs  rounded-xl px-2 py-1 w-fit ">
                    {s.statut}
                    </div>
                    </td>

                {/* Actions */}
                <td className="p-2 flex gap-2">
                  {/* Bouton Éditer */}
                  <button
                    onClick={() => setSelectedSanction(s)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-gray-800"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>

                  {/* Bouton Supprimer */}
                  <button
                   onClick={() => {
                setSummaryData({
                  name: s.name,
                  email: s.email,
                  image: s.image,
                });
                setShowSummary(true);
              }}
                                className="w-8 h-8 flex items-center justify-center border border-red-600 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                Aucune sanction trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de modification */}
      {selectedSanction && (
        <SanctionEditModal
          open={true}
          onClose={() => setSelectedSanction(null)}
          initialData={selectedSanction}
        />
        
      )
      }
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
