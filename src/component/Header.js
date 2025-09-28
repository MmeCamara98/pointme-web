import React, { useState, useRef, useEffect } from "react";
import { Bell, CalendarDays, User, Settings, MessageCircle } from "lucide-react";


function Header() {
   // ✅ Date dynamique
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
   const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // ✅ Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
   <div className="flex justify-between items-center p-5 bg-white border-b">
  {/* Date du jour */}
  <div className="flex items-center gap-4">
    <span className="text-gray-600 font-medium">{today}</span>
  </div>

  {/* Profil + Notifications */}
  <div className="flex items-center gap-4 relative" ref={menuRef}>
     {/* Icônes à droite de la date */}
    <div className="flex items-center gap-3 ml-4">
      <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full relative">
        <MessageCircle className="w-4 h-4 text-white" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </div>
    </div>
    <button className="relative">
      <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
      <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
    </button>

    <img
      src="https://i.pravatar.cc/40"
      alt="profile"
      className="w-10 h-10 rounded-full cursor-pointer"
      onClick={() => setOpen(!open)}
    />

    {open && (
      <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg">
        <ul className="text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profil</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Modifier Nom</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Modifier email</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Modifier mot de passe</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Modifier photo de profil</li>
        </ul>
      </div>
    )}
  </div>
</div>


  );
}

export default Header;
