import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSanction } from "../features/sanctionSlice";
import Modal from "./Modal";

export default function SanctionFormModal({ open, onClose }) {
  const trainees = useSelector((state) => state.trainee.trainees) || [];
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    traineeId: "",
    motif: "",
    description: "",
    niveau: "Avertissement",
  });

  const niveaux = ["Avertissement", "Suspension", "Renvoi"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Récupérer le stagiaire choisi
    const trainee = trainees.find((t) => t.name === form.traineeId);

    // ✅ Construire la sanction avec les bons champs attendus par SanctionTable
    const sanction = {
      id: Date.now(),
      name: trainee?.name || "Inconnu",
      image: trainee?.image || "/default-avatar.png",
      motif: form.motif,
      description: form.description,
      niveau: form.niveau,
      date: new Date().toLocaleDateString(),
      statut: "Non Lue", // tu peux changer selon ton besoin
    };

    // ✅ Enregistrer dans Redux
    dispatch(addSanction(sanction));

    // ✅ Fermer la modale
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle sanction">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Choix stagiaire */}
        <div>
          <label className="block text-sm font-medium">Stagiaire</label>
          <select
            name="traineeId"
            value={form.traineeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
            required
          >
            <option value="">-- Choisir un stagiaire --</option>
            {trainees.map((t, index) => (
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Motif */}
        <div>
          <label className="block text-sm font-medium">Motif</label>
          <input
            type="text"
            name="motif"
            value={form.motif}
            onChange={handleChange}
            placeholder="Ex: Retards répétés"
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Détaillez la situation..."
            rows={3}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Niveau */}
        <div>
          <label className="block text-sm font-medium">Niveau</label>
          <div className="flex gap-2 mt-1">
            {niveaux.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm((f) => ({ ...f, niveau: n }))}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  form.niveau === n
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  );
}
