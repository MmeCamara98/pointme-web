const discussions = [
  {
    id: 1,
    name: "Bamba seck",
    message: "Bonjour coach, désolé 🙏 j’ai eu un problème avec mon réveil ce matin",
    time: "9h15",
  },
  {
    id: 2,
    name: "Aliou fall",
    message: "Bonjour coach, il y avait un énorme embouteillage, je suis coincé sur la route 🚗",
    time: "9h15",
  },
  {
    id: 3,
    name: "Aminata dramé",
    message: "Bonjour coach, je suis malade ce matin 😌, je ne pourrai pas être présent",
    time: "9h15",
  },
];

export default function DiscussionsModal() {
  return (
    <div className="bg-white rounded-xl shadow-lg border w-full max-h-[70vh] overflow-y-auto p-4 z-50">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Discussions</h2>
      </div>

      {/* Onglets */}
      <div className="flex space-x-4 mb-4">
        <button className="px-3 py-1 bg-green-200 rounded-full text-sm font-medium">
          Tout
        </button>
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
          Non lus
        </button>
      </div>

      {/* Barre recherche */}
      <input
        type="text"
        placeholder="Rechercher un stagiaire..."
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
      />

      {/* Liste messages */}
      <div className="space-y-3">
        {discussions.map((d) => (
          <div
            key={d.id}
            className="flex items-start justify-between bg-gray-50 p-3 rounded-lg"
          >
            {/* Avatar + infos */}
            <div className="flex items-start space-x-3">
              <img
                src="/avatar.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600">{d.message}</p>
              </div>
            </div>

            {/* Heure + bouton */}
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{d.time}</span>
              <button className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-full">
                Répondre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
