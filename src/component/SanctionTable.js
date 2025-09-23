import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function SanctionTable({ sanctions = [], onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className=" text-left text-sm text-gray-700">
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
            <tr key={s.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                 
              {/* Stagiaire */}
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={s.image || "/default-avatar.png"}
                    alt={s.name}
                    className="w-8 h-8 rounded-full "
                  />
                  <span className="font-medium text-gray-800">{s.name}</span>
                </td>
              <td className="p-2">
                <div className="font-medium">{s.motif}</div>
                <div className="text-xs text-gray-500">{s.description}</div>
              </td>
              <td className="p-2">{s.niveau}</td>
              <td className="p-2">{s.date}</td>
              <td className="p-2 text-red-600 font-semibold">{s.statut}</td>
              <td className="p-2 flex gap-3">
                <button onClick={() => onEdit(s)} className="text-gray-700 hover:text-blue-600">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(s.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
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
  );
}
