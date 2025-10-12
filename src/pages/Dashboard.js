import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import TraineeTable from "../component/TraineeTable";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { MessageCircle, Users, Calendar, AlertCircle, Search,CircleX } from "lucide-react";
import Bull from "../component/Bull";
import bull1 from "../assets/Blobs1 .png";
import bull2 from "../assets/Blobs2 .png";
import bull3 from "../assets/Blobs3.png";
import bull4 from "../assets/Blobs4.png";

export default function Dashboard() {
  const dashboard = useSelector((state) => state.dashboard) || {};
  const { total = 4, presents = 0, late = 0, trainees = [] } = dashboard;
  const [search, setSearch] = useState("");

  const filteredTrainees = trainees.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar - SANS bulls */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* MAIN avec bulls - position RELATIVE pour contenir les bulls */}
        <main className="relative p-6 space-y-6 overflow-x-hidden ">
          
          {/* Bulls décoratifs - UNIQUEMENT dans MAIN */}
          {/* Bull en haut à gauche */}
         <Bull src={bull1} className="absolute top-20 left-20 -bottom-10 w-[600px]  z-0 pointer-events-none" />
            <Bull src={bull2} className="absolute top-10 right-20 w-[400px]  z-0 pointer-events-none" />
          
           <Bull src={bull3} className="absolute bottom-0 -bottom-40 left-20 w-[300px]  z-0 pointer-events-none" />
            <Bull src={bull4} className="absolute bottom-0 -bottom-40 right-10 w-[700px] z-0 pointer-events-none" />

          {/* Contenu - au-dessus des bulls avec z-10 */}
          <div className="relative z-10 space-y-6">
            
            <span className="flex items-center justify-center text-2xl text-teal-600 font-bold gap-2">
              Bonjour coach mbaye !
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </span>
                
            {/* Cartes de stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Total Stagiaires */}
              <div className="flex justify-between items-start bg-white p-6 rounded-3xl shadow-lg  overflow-hidden">
                <div>
                  <h3 className="text-gray-700 font-semibold text-base mb-2">Total Stagiaires</h3>
                  <p className="text-4xl font-bold text-gray-900">{total}</p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 shadow-lg overflow-hidden">
                  <Users className="w-7 h-7 text-white" />
                </div>
                {/* <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full"></div> */}
              </div>

              {/* Présents aujourd'hui */}
              <div className="flex justify-between items-start bg-white p-6 rounded-3xl shadow-lg overflow-hidden ">
                <div>
                  <h3 className="text-gray-700 font-semibold text-base mb-2">Présents aujourd'hui</h3>
                  <p className="text-4xl font-bold text-gray-900">{presents}</p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                {/* <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full"></div> */}
              </div>

              {/* Retards à traiter */}
              <div className="flex justify-between items-start bg-white p-6 rounded-3xl shadow-lg overflow-hidden ">
                <div>
                  <h3 className="text-gray-700 font-semibold text-base mb-2">Retards à traiter</h3>
                  <p className="text-4xl font-bold text-gray-900">{late}</p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 shadow-lg">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                {/* <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full"></div> */}
              </div>

              {/* Absences */}
              {/* Absences - VERSION CORRIGÉE COMPLÈTE */}
            <div className="flex justify-between items-start bg-white p-6 rounded-3xl shadow-lg ">
              <div>
                <h3 className="text-gray-700 font-semibold text-base mb-2">Absences</h3>
                <p className="text-4xl font-bold text-gray-900">1</p>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 shadow-lg">
                <CircleX className="w-7 h-7 text-white" />
              </div>
              {/* <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full"></div> */}
            </div>
            </div>

            {/* Tableau des stagiaires */}
            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Liste des stagiaires</h3>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Rechercher un stagiaire..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <TraineeTable trainees={filteredTrainees} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}