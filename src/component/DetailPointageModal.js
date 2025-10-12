import React, { useState } from "react";
import Modal from "./Modal";


export default function SanctionSummaryModal({ open, onClose, data }) {
  const [selectedMonth, setSelectedMonth] = useState("Septembre");



  return (
    <Modal open={open} onClose={onClose} title="Détail des pointages">
      <div className="p-4 space-y-4">
        {/* Infos stagiaire */}
        <div className="flex items-center gap-4  bg-gray-200 rounded-xl">
          <img
            src={ "https://i.pravatar.cc/60"}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <div className="text-base font-semibold text-gray-800">
              {data.name}
            </div>
            <div className="text-sm text-gray-500">{data.email}</div>
          </div>
        </div>

        {/* Sélecteur de mois */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mois
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-30 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-lg"
          >
            {[
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ].map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Résumé des sanctions */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-teal-600 text-white rounded-lg py-4">
            <div className="text-sm font-medium">Present</div>
            <div className="text-2xl font-bold">{data.avertissement || 0}</div>
          </div>
          <div className="bg-orange-500 text-white rounded-lg py-4">
            <div className="text-sm font-medium">Absence</div>
            <div className="text-2xl font-bold">{data.blame || 0}</div>
          </div>
          <div className="bg-red-500 text-white rounded-lg py-4">
            <div className="text-sm font-medium">Retard</div>
            <div className="text-2xl font-bold">{data.suspension || 0}</div>
          </div>
        </div>

        {/* Bouton OK */}
        <div className="flex  space-x-22 justify-center mt-6 gap-2 ml-4 ">
            <button
            onClick={onClose}
            className="px-6 py-2 bg-red text-white ml-4 rounded-3xl bg-red-400 w-30 "
          >
            Sanction
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-teal-600 text-white rounded-3xl w-32 "
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
