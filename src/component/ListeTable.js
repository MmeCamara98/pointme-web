import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ListeTableau({ records = [], onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="bg-white text-left text-sm text-gray-700">
          <th className="p-2">Stagiaire</th>
          <th className="p-2">Heure du pointage</th>
          <th className="p-2">Date</th>
          <th className="p-2">Statut</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {records.length > 0 ? (
          records.map((r, index) => (
            <tr key={r.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
               <td className="p-3 flex items-center gap-2">
                  <img
                    src={r.image || "/default-avatar.png"}
                    alt={r.name}
                    className="w-8 h-8 rounded-full "
                  />
                  <span className="font-medium text-gray-800">{r.name}</span>
                </td>
              <td className="p-2">{r.time}</td>
              <td className="p-2">{r.date}</td>
              <td className="p-2 font-semibold text-sm">
                {r.status === "À l'heure" ? (
                  <span className="text-green-600">À l'heure</span>
                ) : (
                  <span className="text-red-600">En retard</span>
                )}
              </td>
              <td className="p-2 flex gap-3">
                <button
                  onClick={() => onEdit?.(r)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete?.(r.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500 italic">
              Aucun pointage trouvé.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
