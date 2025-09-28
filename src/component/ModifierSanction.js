import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSanction } from "../features/sanctionSlice"; // à adapter selon ton slice
import Modal from "./Modal";

export default function SanctionEditModal({ open, onClose, initialData }) {
  const trainees = useSelector((state) => state.trainee.trainees) || [];
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    traineeId: initialData?.name || "",
    motif: initialData?.motif || "",
    niveau: initialData?.niveau || "",
    description: initialData?.description || "",
  });

  const niveaux = ["Avertissement", "Suspension", "Blame"];
  const motifs = ["Retard Repeter", "Absence non justifier", "Manque de respect"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trainee = trainees.find((t) => t.name === form.traineeId);

    const updated = {
      ...initialData,
      name: trainee?.name || "Inconnu",
      image: trainee?.image || "/default-avatar.png",
      motif: form.motif,
      niveau: form.niveau,
      description: form.description,
    };

    dispatch(updateSanction(updated));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Modifier la sanction">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Stagiaire */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Stagiaire
          </label>
          <select
            name="traineeId"
            value={form.traineeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-200 text-sm "
            required
          >
            <option value="">Selectionner un stagiaire</option>
            {trainees.map((t, index) => (
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Motif */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Motif
          </label>
          <select
            name="motif"
            value={form.motif}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-200 text-sm"
            required
          >
            <option value="">Selectionner un motif</option>
            {motifs.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Niveau */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Niveau de sanction
          </label>
          <select
            name="niveau"
            value={form.niveau}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-200 text-sm focus:outline-none  "
            required
          >
            <option value="">Selectionner un sanction</option>
            {niveaux.map((n, index) => (
              <option key={index} value={n} className="bg-white rounded-2xl">
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Description détaillée
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Décrire les faits, les contextes et les mesures prise..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-200 text-sm"
            required
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Creer et Notifier
          </button>
        </div>
      </form>
    </Modal>
  );
}
