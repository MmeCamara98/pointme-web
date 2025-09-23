import React from "react";
import { FiEdit, FiAlertTriangle } from "react-icons/fi";

export default function DailyTable({ records = [] }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-700">
            <th className="p-2">Stagiaire</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Arrivée</th>
            <th className="p-2">Sortie</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((r, index) => (
              <tr key={r.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={r.image || "/default-avatar.png"}
                    alt={r.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{r.name}</span>
                </td>
                <td className="p-2">
                  <span
                    className={`font-semibold ${
                      r.status === "Présent"
                        ? "text-green-600"
                        : r.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-2">{r.arrival || "—"}</td>
                <td className="p-2">{r.departure || "—"}</td>
                <td className="p-2">{r.notes || "—"}</td>
                <td className="p-2 flex gap-3 text-gray-600">
                  <FiEdit className="cursor-pointer hover:text-blue-600" />
                  <FiAlertTriangle className="cursor-pointer hover:text-red-600" />
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
    </div>
  );
}
