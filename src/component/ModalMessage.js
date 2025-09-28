import React, { useState } from "react";
import { MessageSquareText } from "lucide-react";

export default function ModalMessage({ user, onClose }) {
  const [message, setMessage] = useState("");


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-2xl text-gray-800 mb-4 flex items-center justify-center gap-2">
  Envoyer un message
  <div className="relative w-8 h-8 flex items-center justify-center rounded-md border border-orange-500 bg-white">
  {/* Bulle de message stylisée */}
  <div className="w-5 h-5 rounded-sm border-2 border-orange-500 relative">
    <div className="absolute bottom-[-4px] left-1 w-2 h-2 rotate-45 bg-white border-l-2 border-b-2 border-orange-500"></div>
  </div>

  {/* Pastille de notification */}
  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border border-white"></span>
</div>
</h2>

        <textarea
          className="w-full h-32 border border-gray-300 rounded-md p-2 text-sm resize-none"
          placeholder="Écrire ici votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              console.log("Message envoyé à", user.name, ":", message);
              onClose();
            }}
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
