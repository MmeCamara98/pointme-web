import React from "react";
import { useSelector } from "react-redux";

export default function TraineeTable() {
  const trainees = useSelector((state) => state.trainee.trainees || []);

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
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={t.image || "/default-avatar.png"}
                    alt={t.name}
                    className="w-8 h-8 rounded-full "
                  />
                  <span className="font-medium text-gray-800">{t.name}</span>
                </td>

                {/* Taux de présence */}
                <td className="p-3">
                  <span className="text-sm">{t.tauxPresence}%</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${t.tauxPresence}%` }}
                    ></div>
                  </div>
                </td>

               {/* Présence 🟩 */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-teal-600 rounded-sm"></div>
                    <span className="text-green-700 font-semibold">
                      {t.present}
                    </span>
                  </div>
                </td>
                {/* Retard 🟨 */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                    <span className="text-yellow-700 font-semibold">
                      {t.retard}
                    </span>
                  </div>
                </td>
                 {/* Absences 🟥 */}
                <td className="p-3 text-center">
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
     </div>
  );
}
