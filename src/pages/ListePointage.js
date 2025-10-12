import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
   CalendarDays ,
  Search,
} from "lucide-react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import ListeTable from "../component/ListeTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Bull from "../component/Bull";
import bull1 from "../assets/Blobs1 .png";
import bull2 from "../assets/Blobs2 .png";
import bull3 from "../assets/Blobs3.png";
import bull4 from "../assets/Blobs4.png";

export default function AttendancePage() {
  const records = useSelector((state) => state.dailyPresence.dailyRecords);
  
  const [startDate, setStartDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
 
   
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
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* MAIN avec bulls */}
        <main className="relative p-6 space-y-6 overflow-x-hidden">
          
        {/* OPTION 2 - Bulls qui se chevauchent au centre */}
{/* Bulls décoratifs positionnés comme dans la maquette */}
          <Bull src={bull1} className="absolute top-15 left-[40px] w-[600px] opacity-90 z-0 pointer-events-none" />
            <Bull src={bull2} className="absolute top-15 right-[-5px] w-[450px] opacity-90 z-0 pointer-events-none" />
          
           <Bull src={bull3} className="absolute bottom-[-190px] left-20 w-[400px] opacity-90 z-0 pointer-events-none" />
            <Bull src={bull4} className="absolute bottom-[-200px] right-[-5px] w-[650px] opacity-90 z-0 pointer-events-none" />


          {/* Contenu au-dessus des bulls */}
          <div className="relative z-10 space-y-6">
            
            {/* Sélecteur de date */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 bg-white px-20 py-3 rounded-xl shadow-md hover:shadow-lg transition "
                >
                  <CalendarDays className="text-teal-600" size={22} />
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

            {/* Tableau de pointage */}
            <div className="bg-white p-6 rounded-3xl shadow-lg">
              {/* En-tête */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Pointages du {today}
                </h2>
                
                <div className="flex gap-3">
                  {/* Barre de recherche */}
                  <div className="flex items-center gap-2 border px-3 py-2 rounded-xl bg-white w-64">
                    <Search className="text-teal-600 w-5 h-5" />
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
                    className=" px-2 py-1 shadow-sm rounded-xl bg-gray-50 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Statut</option>
                    <option value="Présent">Présent</option>
                    <option value="Retard">Retard</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              {/* Tableau */}
              <ListeTable records={filteredRecords} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}