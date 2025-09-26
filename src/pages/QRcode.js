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
import DailyTable from "../component/DailyTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QRCodeCanvas } from "qrcode.react";
import bgImage from "../assets/bg.png"; // ✅ ton image dans assets

export default function AttendancePage() {
  const records = useSelector((state) => state.dailyPresence.dailyRecords);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [search, setSearch] = useState("");

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

            {/* Bouton Afficher le Qr code */}
            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
            >
              <QrCode className="text-teal-600" size={22} />
              <span className="text-black font-medium">
                {showQr ? "Masquer le Qr code" : "Afficher le Qr code"}
              </span>
            </button>

            {/* 🟢 Affichage conditionnel du QR code */}
            {showQr && (
              <QRCodeCanvas
                value={
                  startDate ? startDate.toLocaleDateString() : "Pas de date choisie"
                }
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
                <span className="text-gray-600 font-medium">
                  Pointage du {today}
                </span>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher un stagiaire..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Tableau */}
            <DailyTable records={filteredRecords} />
          </div>
        </main>
      </div>
    </div>
  );
}
