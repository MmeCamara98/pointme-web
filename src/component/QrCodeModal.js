import React, { useState } from "react";

export default function QrCodeModal({ onClose }) {
  const [confirmed, setConfirmed] = useState(false);

  const handleGenerate = () => {
    // Simule une confirmation de pointage
    setConfirmed(true);
  };

  const handleBack = () => {
    setConfirmed(false);
  };

  const arrivalTime = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
        {/* Vue QR code */}
        {!confirmed ? (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Qr code actuel</h2>

            <div className="bg-teal-100 p-4 rounded-md mb-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Qr-777-098-777"
                alt="QR Code"
                className="mx-auto"
              />
            </div>

            <p className="text-sm text-gray-600 mb-4">Code : Qr - 777-098-777</p>

            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-teal-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-teal-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 4v5h.582a7.5 7.5 0 0113.836 0H20V4H4z" />
                <path d="M20 20v-5h-.582a7.5 7.5 0 01-13.836 0H4v5h16z" />
              </svg>
              Générer un nouveau Qr code
            </button>
          </>
        ) : (
          // Vue confirmation
          <div onClick={handleBack} className="cursor-pointer">
            <h2 className="text-lg font-semibold text-teal-600 mb-4 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Pointage effectué
            </h2>

            <div className="bg-teal-100 p-6 rounded-md mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-teal-600 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-sm text-gray-800">Arrivée à {arrivalTime}</p>
            <p className="mt-4 text-xs text-gray-500 italic">Cliquez ici pour revenir au QR code</p>
          </div>
        )}

        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
