import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MessageSquareText } from "lucide-react";
import ModalMessage from "./ModalMessage";

export default function DailyTable() {
  const clockRecords = useSelector((state) => state.clock?.records || []);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);
  

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
              const status = r.status?.trim().toLowerCase();

              return (
                <tr
                  key={r.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800">{r.name}</span>
                  </td>

                  <td className="p-3 text-gray-700 whitespace-nowrap">
                    {r.time || "—"}
                  </td>

                  <td className="p-3 text-gray-700 whitespace-nowrap">
                    {new Date().toLocaleDateString("fr-FR")}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        status ==="A l'heure"
                          ? "bg-teal-600 text-white"
                          : status === "En retard"
                          ? "bg-orange-400 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600 whitespace-nowrap">
  {status === "a retard" && (
    <div
      onClick={() => openModal(r)}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-orange-500 bg-white hover:bg-orange-50 cursor-pointer"
    >
      {/* Bulle vide stylisée */}
      <div className="w-5 h-5 rounded-sm border-2 border-orange-500 relative">
        <div className="absolute bottom-[-4px] left-1 w-2 h-2 rotate-45 bg-white border-l-2 border-b-2 border-orange-500"></div>
      </div>

      {/* Pastille de notification */}
      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border border-white"></span>
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

      {selectedUser && (
        <ModalMessage user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
}
