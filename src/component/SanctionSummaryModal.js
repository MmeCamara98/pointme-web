import React, { useState } from "react";
import Modal from "./Modal";
import { updateSanction } from "../features/sanctionSlice";

export default function SanctionSummaryModal({ open, onClose, data }) {
  const [selectedMonth, setSelectedMonth] = useState("Septembre");



  return (
    <Modal open={open} onClose={onClose} title="Détail des pointages">
      <div className="p-4 space-y-4">
        {/* Infos stagiaire */}
        <div className="flex items-center gap-4">
          <img
            src={data.image || "https://i.pravatar.cc/60"}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
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
            <div className="text-sm font-medium">Avertissement</div>
            <div className="text-2xl font-bold">{data.avertissement || 0}</div>
          </div>
          <div className="bg-orange-500 text-white rounded-lg py-4">
            <div className="text-sm font-medium">Blâme</div>
            <div className="text-2xl font-bold">{data.blame || 0}</div>
          </div>
          <div className="bg-red-500 text-white rounded-lg py-4">
            <div className="text-sm font-medium">Suspension</div>
            <div className="text-2xl font-bold">{data.suspension || 0}</div>
          </div>
        </div>

        {/* Bouton OK */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
