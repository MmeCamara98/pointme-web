import React, { useState, useRef, useEffect } from "react";
import { Bell, MessageCircle } from "lucide-react";
import ProfileModal from "./ProfileModal";
import NotificationModal from "./NotificationModal";
import DiscussionsModal from "./MessageModal";

function Header() {
  // ✅ Date dynamique
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // States
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Ref pour tout le menu
  const menuRef = useRef(null);

  // Fermer si clic extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDiscussion(false);
        setShowNotifications(false);
        setShowProfileModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center p-5 bg-white border-b">
      {/* Date du jour */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium">{today}</span>
      </div>

      {/* Menu à droite */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Discussions */}
        <div className="relative">
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenDiscussion((prev) => !prev)}
          >
            <MessageCircle className="w-7 h-7 text-black" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          {openDiscussion && (
            <div className="absolute right-0 mt-3 w-[420px] z-50">
              <DiscussionsModal />
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[400px] z-50">
              <NotificationModal
                open={true}
                onClose={() => setShowNotifications(false)}
                notifications={[
                  {
                    type: "Retard",
                    title: "Retard détecté",
                    message: "Aminata est arrivé avec 15 minutes de retard",
                    time: "9h15",
                    canReply: true,
                  },
                  {
                    type: "Présence",
                    title: "Présence",
                    message: "Bamba est présent aujourd'hui",
                    time: "9h15",
                    canReply: false,
                  },
                  {
                    type: "Absence",
                    title: "Absence",
                    message: "Aminata est absente aujourd'hui",
                    time: "9h15",
                    canReply: true,
                  },
                ]}
              />
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setShowProfileModal((prev) => !prev)}
          />
          {showProfileModal && (
            <div className="absolute right-0 mt-3 w-[300px] z-50">
              <ProfileModal
                open={true}
                onClose={() => setShowProfileModal(false)}
                user={{
                  name: "Mbaye Seck",
                  email: "Mbayeseck21@gmail.com",
                  phone: "+221 78 234 55 66",
                  image: "https://i.pravatar.cc/100?u=mbaye",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
