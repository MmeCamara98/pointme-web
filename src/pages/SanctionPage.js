import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import SanctionTable from "../component/SanctionTable";
import Bull from "../component/Bull";
import bull1 from "../assets/Blobs1 .png";
import bull2 from "../assets/Blobs2 .png";
import bull3 from "../assets/Blobs3.png";
import bull4 from "../assets/Blobs4.png";

import {
  AlertCircle,
  ShieldAlert,
  Bell,
  Search,
  Plus,
  MessageSquareDot,
} from "lucide-react"; // ✅ tout vient de lucide-react maintenant
import SanctionFormModal from "../component/SanctionFormModal";
import { Ban, FileText, Clock, ThumbsDown } from "lucide-react";

import bgImage from "../assets/bg1.png"; // ✅ ton image dans assets

export default function SanctionDashboard() {
  const sanctions = useSelector((state) => state.sanction.sanctions) || [];
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Mes sanctions");
  const [open, setOpen] = useState(false);
   const [statusFilter, setStatusFilter] = useState("");

  const filteredSanctions = sanctions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (sanction) => {
    console.log("Éditer sanction :", sanction);
  };

  const handleDelete = (id) => {
    console.log("Supprimer sanction id:", id);
  };

  // Statistiques
  const total = sanctions.length;
  const warnings = sanctions.filter((s) => s.niveau === "Avertissement").length;
  const suspensions = sanctions.filter((s) => s.niveau === "Suspension").length;
  const renvois = sanctions.filter((s) => s.niveau === "Renvoi").length;

  return (
    <div
      className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col ">
        <Header />

        <main className="relative p-6 space-y-6 overflow-x-hidden">
           {/* Bulls décoratifs positionnés comme dans la maquette */}
     <Bull src={bull1} className="absolute top-5 left-20 -bottom-10 w-[600px]  z-0 pointer-events-none" />
            <Bull src={bull2} className="absolute top-5 right-0 w-[500px]  z-0 pointer-events-none" />
          
           <Bull src={bull3} className="absolute bottom-0 -bottom-40 left-20 w-[300px]  z-0 pointer-events-none" />
            <Bull src={bull4} className="absolute bottom-0 -bottom-40 right-10 w-[700px] z-0 pointer-events-none" />
          {/* Cartes de stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative overflow-hidden">
  <StatCard 
    title="Total Sanction" 
    value={total} 
    icon={<Ban />} 
  />
  <StatCard
    title="Avertissement"
    value={warnings}
    icon={<FileText />}
  />
  <StatCard
    title="Suspension"
    value={suspensions}
    icon={<Clock />}
  />
  <StatCard 
    title="Non lus" 
    value={renvois} 
    icon={<MessageSquareDot/>} 
  />
</div>

          <div className="space-y-6 relative overflow-hidden">
            {/* Onglets */}
            <div className="flex gap-1 bg-teal-100/50 p-1.5 rounded-full w-fit">
  {["Mes sanctions", "Alertes"].map((label) => (
    <button
      key={label}
      onClick={() => setTab(label)}
      className={`px-4 py-1 text-sm font-semibold rounded-full transition-all duration-300 ${
        tab === label
          ? "bg-teal-600 text-white shadow-md"
          : "text-black hover:bg-teal-200/50"
      }`}
    >
      {label}
    </button>
  ))}
</div>

            {/* Recherche + filtre + bouton */}
            <div className="flex items-center justify-between gap-3 relative overflow-hidden">
              <div className="flex gap-3 flex-grow">
                {/* Barre de recherche */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-2xl bg-white w-64">
                  <Search className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Rechercher un stagiaire..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>

                {/* Filtre */}
                <select className="border px-3 py-2 rounded-xl text-sm bg-white">
                  <option value="">Toutes</option>
                  <option value="Avertissement">Avertissement</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Renvoi">Renvoi</option>
                </select>
                 {/* Filtre statut */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-3 py-2 shadow-lg rounded-xl bg-white text-sm w-40"
              >
                <option value="">status</option>
                <option value="Non lues">Non lue</option>
                <option value="Lue">Lue</option>
              </select>
              </div>

              {/* Bouton nouvelle sanction */}
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-teal-700 transition"
              >
                <Plus className="text-black" size={18} />
                <span className="text-sm text-black font-bold">
                  Nouvelle sanction
                </span>
              </button>
            </div>
          </div>

          {/* Tableau des sanctions */}
          <div className="bg-white p-6 rounded-2xl shadow relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-2">Liste des sanctions</h3>
            <SanctionTable
              sanctions={filteredSanctions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Modale */}
          <SanctionFormModal open={open} onClose={() => setOpen(false)} />
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="flex justify-between items-start bg-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
      <div>
        <h3 className="text-gray-700 font-semibold text-base mb-2">{title}</h3>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600 shadow-lg">
        {React.cloneElement(icon, { className: "w-7 h-7 text-white" })}
      </div>
      
    </div>
  );
}
