import React from "react";
import { Home, QrCode, Ban, List } from "lucide-react";


function Sidebar() {
  return (
    <div className="w-64 bg-teal-600 text-white flex flex-col p-5">
      <div className="text-2xl font-bold mb-10">Easy point-me</div>
      <nav className="space-y-5">
        <a href="/dashboard" className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-lg">
          <Home size={20}/> Dashboard
        </a>
        <a href="/QRcode" className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-lg">
          <QrCode size={20}/> Qr code
        </a>
        <a href="/Sanction" className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-lg">
          <Ban size={20}/> Sanctions
        </a>
        <a href="Liste" className="flex items-center gap-3 hover:bg-teal-700 p-2 rounded-lg">
          <List size={20}/> Liste pointage
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
