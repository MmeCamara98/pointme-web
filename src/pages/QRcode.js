import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Clock, AlertCircle, Search, Download } from "lucide-react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import bgImage from "../assets/bg1.png"; // ✅ ton image dans assets
import DailyTable from "../component/DailyTable";

import {
  Calendar as CalendarIcon,
  QrCode,
 
} from "lucide-react"; // ✅ on prend tout ici
import QrCodeModal from "../component/QrCodeModal";


export default function ClockPage() {
  const records = useSelector((state) => state.clock.records);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [open, setOpen] = useState(false);
   const [showQr, setShowQr] = useState(false);
  

  const filtered = records.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? r.status === statusFilter : true)
  );

  const onTimeCount = records.filter((r) => r.status === "A l'heure").length;
  const lateCount = records.filter((r) => r.status === "En retard").length;

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col ">
        <Header />

        <main className="p-6 space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Liste des Stagiaires</h3>
          </div>

          {/* Cartes de résumé */}
          <div className="flex space-x-10 ">
            <Card title="À l'heure" value={onTimeCount} icon={<Clock />} />
            <Card title="En retard" value={lateCount} icon={<AlertCircle />} />
          </div>

          {/* Sélecteur de date */}
          <div className="flex items-center gap-4 p-4">
             <div className="relative">
                          <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
                          >
                            <CalendarIcon className="text-teal-600" size={22} />
                            <span className="text-black font-medium">Choisir une date</span>
                          </button>
            
                          {open && (
                            <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  setOpen(false);
                                }}
                                inline
                              />
                            </div>
                          )}
                        </div>
                        <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
            >
              <QrCode className="text-teal-600" size={22} />
              <span className="text-black font-medium">
                {showQr ? "Masquer le Qr code" : "Afficher le Qr code"}
              </span>
            </button>

{/* Modal Qr Code */}
{showQr && <QrCodeModal onClose={() => setShowQr(false)} />}
            
                        
                      </div>

          {/* Filtres + recherche + export */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex space-x-2">
              {/* Barre de recherche */}
              <div className="flex items-center gap-2 border px-3 py-2 rounded-xl bg-white w-60 shadow-lg">
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un stagiaire..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              {/* Filtre statut */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-3 py-2 shadow-lg rounded-xl bg-white text-sm w-40"
              >
                <option value="">status</option>
                <option value="À l'heure">À l'heure</option>
                <option value="En retard">En retard</option>
              </select>

              

              {/* Bouton Export */}
              <button className="flex items-center gap-2 border px-3 py-2 shadow-lg rounded-xl bg-white text-sm w-40">
                <Download className="w-5 h-5" />
                <span className="font-medium">Exporter</span>
              </button>
            </div>

            {/* Tableau */}
            <DailyTable records={filtered} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="flex justify-between items-center bg-white p-6 gap-2 rounded-2xl shadow-2xl w-80">
      <div>
        <h3 className="text-black font-bold text-lg">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600">
        {React.cloneElement(icon, { className: "w-6 h-6 text-white" })}
      </div>
    </div>
  );
}
