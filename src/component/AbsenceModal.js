import React, { useState } from "react";


export default function AbsenceModal({ open, onClose, onSend }) {
  const [message, setMessage] = useState("");

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md justify-center">
        {/* Titre */}
        <div className="flex justify-center  mb-5 ">
          <h2 className="text-2xl text-center text-gray-800">
            Absence non justifiée
          </h2>
          <div className="w-8 h-8 r flex items-center justify-center border border-red-500 rounded-md bg-white ml-2">
            <span className="text-red-500 font-bold text-lg">?</span>
          </div>
        </div>

        {/* Sous-titre */}
        <div className="text-xl font-bold text-center  text-gray-700 mb-2 rounded-xl">
          Envoyer un message
        </div>

        {/* Champ de message */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message"
          className="w-full h-24 border border-gray-300 rounded-md p-2 text-sm resize-none"
        />

        {/* Boutons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2  rounded-xl border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onSend(message);
              setMessage("");
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Envoyer et notifier
          </button>
        </div>
      </div>
    </div>
  );
}
