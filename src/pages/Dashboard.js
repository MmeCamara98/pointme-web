// src/pages/Dashboard.js
// import React from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import TraineeTable from "../component/TraineeTable";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Users, Calendar, AlertCircle } from "lucide-react";
import { Search } from "lucide-react";


export default function Dashboard() {
  // On récupère le state dashboard de Redux (ou objet vide si undefined)
  const dashboard = useSelector((state) => state.dashboard) || {};

  // On déstructure avec valeurs par défaut
  const {
    total = 0,
    presents = 0,
    late = 0,
    trainees = [],
  } = dashboard;
  // ✅ 1. State pour la recherche
  const [search, setSearch] = useState("");
   

  // ✅ 2. Filtrer les stagiaires
  const filteredTrainees = trainees.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="p-6 space-y-6">
           <span className="flex items-center justify-center text-5xl text-teal-600 font-semibold gap-2">
            Bonjour coach mbaye !
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 shadow">
    <MessageCircle className="w-5 h-5 text-white" />
    
         </div>
            </span>
          {/* Cartes de stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Total Stagiaires */}
  <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
    <div>
      <h3 className="text-black font-bold text-lg">Total Stagiaires</h3>
      <p className="text-2xl font-bold">{total}</p>
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600">
      <Users className="w-6 h-6 text-white" />
    </div>
  </div>

  {/* Présent Aujourd'hui */}
  <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
    <div>
      <h3 className="text-black font-bold text-lg">Présent Aujourd'hui</h3>
      <p className="text-2xl font-bold ">{presents}</p>
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600">
      <Calendar className="w-6 h-6 text-white" />
    </div>
  </div>

  {/* Retard à Traiter */}
  <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
    <div>
      <h3 className="text-black font-bold text-lg">Retard à Traiter</h3>
      <p className="text-2xl font-bold ">{late}</p>
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600">
      <AlertCircle className="w-6 h-6 text-white" />
    </div>
  </div>
</div>

          {/* Tableau des stagiaires */}
  <div className="bg-white p-6 rounded-2xl shadow">
            
  {/* Barre de recherche */}
               <h3 className="text-lg font-semibold mb-2">Liste des Stagiaires</h3>
               <div className="flex items-center gap-2 border px-3 py-2 rounded bg-gray-100">
                 <Search className="text-gray-500" />
                 <input
                   type="text"
                   placeholder="Rechercher un stagiaire..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               
             </div>

  {/* Tableau */}
  <TraineeTable trainees={filteredTrainees} />
</div>
          
        </main>
      </div>
    </div>
  );
}
