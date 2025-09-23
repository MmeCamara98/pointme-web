import React from "react";
import { useSelector } from "react-redux";
import { FiEdit, FiAlertTriangle } from "react-icons/fi";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import  { useState } from "react";
import DailyTable from "../component/DailyTable"; 
import { FiCalendar } from "react-icons/fi";
import { MdQrCode } from "react-icons/md"; // ✅ icône QR valide
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QRCodeCanvas } from "qrcode.react";


export default function AttendancePage() {
  const records = useSelector((state) => state.dailyPresence.dailyRecords);
  const [selectedDate, setSelectedDate] = useState("");
   // 🟢 Définition des états
  const [startDate, setStartDate] = useState(null);
  const [open, setOpen] = useState(false);
   const [showQr, setShowQr] = useState(false); 
 const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
   // ✅ 1. State pour la recherche
    const [search, setSearch] = useState("");
     
  
    // ✅ 2. Filtrer les stagiaires
    const filteredRecords = records.filter((r) =>
  r.name.toLowerCase().includes(search.toLowerCase())
);

  return (
     <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="p-6 space-y-6">
        {/* Tableau des stagiaires */}
        <div className="flex items-center gap-4 p-4 ">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <FiCalendar className="text-teal-600" size={22} />
          <span className="text-black font-medium">Choisir une date</span>
        </button>

        {open && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setOpen(false); // ferme après sélection
              }}
              inline
            />
          </div>
        )}
      </div>

      {/* Bouton Afficher le Qr code */}
        <button
          onClick={() => setShowQr(!showQr)}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <MdQrCode className="text-teal-600" size={22} />
          <span className="text-black font-medium">
            {showQr ? "Masquer le Qr code" : "Afficher le Qr code"}
          </span>
        </button>
        {/* 🟢 Affichage conditionnel du QR code */}
      {showQr && (
        
          <QRCodeCanvas
            value={startDate ? startDate.toLocaleDateString() : "Pas de date choisie"}
            size={200}
            level={"H"}
            includeMargin={true}
          />
        
         )}
    </div>
  <div className="bg-white p-6 rounded-2xl shadow">
    
            
  {/* Barre de recherche */}
  <div className="mb-4">
   <div className="flex justify">
    <span className="text-gray-600 font-medium"> Pointage du {today}</span>
  </div>
  <input
    type="text"
    placeholder="Rechercher un stagiaire..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  {/* Tableau */}
 <DailyTable records={filteredRecords} />

  
</div>
        </main>
      </div>
    </div>
    
    
  );
}
