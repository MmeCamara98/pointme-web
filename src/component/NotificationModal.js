import React from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  ShieldAlert,
  AlertTriangle,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";


const iconMap = {
  Retard: <Clock className="w-5 h-5 text-orange-500" />,
  Présence: <CheckCircle className="w-5 h-5 text-teal-600" />,
  Absence: <XCircle className="w-5 h-5 text-red-500" />,
  Sanction: <ShieldAlert className="w-5 h-5 text-yellow-500" />,
  Alerte: <AlertTriangle className="w-5 h-5 text-red-600" />,
};

const getButtonColors = (type) => {
  switch (type) {
    case "Retard":
      return {
        voirPlus: "bg-orange-500 text-white hover:bg-orange-600",
        message: "bg-orange-500 text-white hover:bg-orange-600",
      };
    case "Absence":
      return {
        voirPlus: "bg-red-500 text-white hover:bg-red-600",
        message: "bg-red-500 text-white hover:bg-red-600",
      };
    case "Présence":
      return {
        voirPlus: "bg-teal-600 text-white hover:bg-teal-600",
        message: null,
      };
      case "Sanction":
      return {
        voirPlus: "bg-red-500 text-white hover:bg-red-600",
        message: null,
      };
      
    default:
      return {
       voirPlus: "bg-red-500 text-white hover:bg-red-600",
        message: "bg-red-500 text-white hover:bg-red-600",
      };
  }
};

export default function NotificationModal({ open, onClose, notifications }) {

  return (
        <div className="bg-white rounded-xl shadow-lg border w-full max-h-[70vh] overflow-y-auto p-6 z-50">
      {/* Titre */}
      <div className=" justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
        <span className="text-xl text-black font-medium">3 non lue(s)</span>
      </div>

      {/* Liste */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {notifications.map((n, index) => {
          const colors = getButtonColors(n.type);
          return (
            <div key={index} className="border-b pb-3 rounded-xl bg-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {iconMap[n.type]}
                  <h3 className="text-xl  text-gray-700">{n.title}</h3>
                </div>
                <span className="text-xj  font-bold text-black">{n.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              <div className="flex gap-3 mt-2">
                <button className={`flex items-center gap-1 px-3 py-1 text-xs rounded-xl ${colors.voirPlus}`}>
                  <MoreHorizontal className="w-4 h-4" />
                  Voir plus
                </button>
                {colors.message && n.canReply && (
                  <button className={`flex items-center gap-1 px-3 py-1 text-xs rounded-xl ${colors.message}`}>
                    <MessageSquare className="w-4 h-4" />
                    Envoyer un message
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton bas */}
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        Voir toutes notifications
      </button>
    </div>
  );
}
