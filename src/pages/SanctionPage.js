import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import SanctionTable from "../component/SanctionTable";
import { AlertCircle, ShieldAlert, Ban, Bell, Search } from "lucide-react";
import { FiSearch, FiPlus } from "react-icons/fi";
import SanctionFormModal from "../component/SanctionFormModal";
import { addSanction } from "../features/sanctionSlice";


export default function SanctionDashboard() {
  const sanctions = useSelector((state) => state.sanction.sanctions) || [];
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
  const [tab, setTab] = useState("Mes sanctions");

  const filtered = sanctions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
const [open, setOpen] = useState(false);
  // Filtrage par nom
  const filteredSanctions = sanctions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  // ✅ Gestion édition et suppression (optionnel)
  const handleEdit = (sanction) => {
    console.log("Éditer sanction :", sanction);
    // Ici tu pourrais rouvrir la modale pré-remplie
  };

  const handleDelete = (id) => {
    console.log("Supprimer sanction id:", id);
    // Tu peux créer un reducer removeSanction dans sanctionSlice
    // dispatch(removeSanction(id));
  };

  // Statistiques
  const total = sanctions.length;
  const warnings = sanctions.filter((s) => s.niveau === "Avertissement").length;
  const suspensions = sanctions.filter((s) => s.niveau === "Suspension").length;
  const renvois = sanctions.filter((s) => s.niveau === "Renvoi").length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">
         

          {/* Cartes de stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Sanctions" value={total} icon={<Bell />} />
            <StatCard title="Avertissements" value={warnings} icon={<ShieldAlert />} />
            <StatCard title="Suspensions" value={suspensions} icon={<Ban />} />
            <StatCard title="Renvois" value={renvois} icon={<AlertCircle />} />
          </div>
          <div className="space-y-6">
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
  {["Mes sanctions", "Alertes"].map((label) => (
    <button
      key={label}
      onClick={() => setTab(label)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        tab === label
          ? "bg-white text-teal-600 shadow-sm"   // ✅ style actif
          : "text-gray-600 hover:bg-white"       // ✅ style inactif
      }`}
    >
      {label}
    </button>
  ))}
</div>

<div className="flex items-center justify-between gap-3">
  {/* Bloc gauche : recherche + filtre */}
  <div className="flex gap-3 flex-grow">
    {/* Barre de recherche */}
    <div className="flex items-center gap-2 border px-3 py-2 rounded-xl bg-white w-64">
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
  </div>

  {/* Bouton complètement à droite */}
  <button onClick={() => setOpen(true)}
   className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-teal-700 transition">
    < FiPlus />
    <span className="text-sm text-black font-bold font-medium" >Nouvelle sanction</span>
  </button>
</div>


    </div>
          {/* Tableau des sanctions */}
          <div className="bg-white p-6 rounded-2xl shadow">
           <h3 className="text-lg font-semibold mb-2">Liste des sanctions</h3>

            {/* Tableau */}
            <SanctionTable sanctions={filteredSanctions}
        onEdit={handleEdit}
        onDelete={handleDelete} />
          </div>
          {/* Modale de création */}
      <SanctionFormModal open={open} onClose={() => setOpen(false)} />
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
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
