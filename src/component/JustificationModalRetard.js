import React, { useState } from "react";

export default function JustificationModal({ open, onClose, onValidate, onReply, justification }) {
  const [response, setResponse] = useState("");



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 w-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        {/* Titre */}
        <div className="flex justify-center  mb-5">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Justification d’absence
          </h2>
          <div className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-md ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M7 4h10v16H7z" />
              <path d="M7 4l5 5h5" />
            </svg>
          </div>
        </div>

        {/* Message du stagiaire */}
        <div className="mb-4">
          <div className="text-xl text-center font-medium text-gray-700 mb-1">Message du stagiaire</div>
          <p className="text-gray-800 text-xl text-center leading-relaxed">
             "Bonjour coach, j’ai dû accompagner un membre de ma famille à l’hôpital. Désolé pour l’absence. 🙏"
          </p>
        </div>

        {/* Pièce jointe */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Pièce jointe
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 4v16h16V4H4zm8 12v-4m0 0l-2 2m2-2l2 2" />
            </svg>
          </button>
        </div>

        {/* Champ de réponse */}
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Écrire un message"
          className="w-full h-24 border border-gray-300 rounded-md p-2 text-sm resize-none mb-4"
        />

        {/* Boutons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onReply(response);
              setResponse("");
              onClose();
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-red-600"
          >
            Répondre
          </button>
          <button
            onClick={() => {
              onValidate(justification);
              onClose();
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
