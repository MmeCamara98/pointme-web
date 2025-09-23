import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

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
   <div className="flex justify-between items-center p-5 bg-white ">
  {/* Date du jour */}
  <div className="flex justify-end">
    <span className="text-gray-600 font-medium">{today}</span>
  </div>

  <div className="flex items-center gap-4 relative" ref={menuRef}>
      {/* Icône notification */}
      <button className="relative">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Profil */}
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* ✅ Menu déroulant */}
      {open && (
        <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profil
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Modifier Nom 
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Modifier email
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Modifier mot de passe
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Modifier photo de profil
            </li>
          </ul>
        </div>
      )}
    </div>
  
</div>

  );
}

export default Header;
