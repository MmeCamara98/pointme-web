import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Calendar as CalendarIcon,
  QrCode,
  Edit3,
  AlertTriangle,
  Search,
} from "lucide-react"; // ✅ on prend tout ici
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import ListeTable from "../component/ListeTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QRCodeCanvas } from "qrcode.react";
import bgImage from "../assets/bg1.png"; // ✅ ton image dans assets

import { Download } from "lucide-react";

export default function AttendancePage() {
  const records = useSelector((state) => state.dailyPresence.dailyRecords);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [open, setOpen] = useState(false);
 
  const [search, setSearch] = useState("");
 
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("Aujourd'hui");
   
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filteredRecords = records.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {/* Tableau des stagiaires */}
          <div className="flex items-center gap-4 p-4 ">
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

           
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            {/* Barre de recherche */}
            <div className="mb-4">
              <div className="flex justify">
                <span className="text-gray-600 font-medium">
                  Pointage du {today}
                </span>
              </div>
              <div className="flex gap-3 flex-grow">
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
                <option value="À l'heure">Present</option>
                <option value="En retard">Retard</option>
                <option value="En retard">Absent</option>
              </select>

             
            </div>
            </div>

            {/* Tableau */}
            <ListeTable records={filteredRecords} />
          </div>
        </main>
      </div>
    </div>
  );
}
