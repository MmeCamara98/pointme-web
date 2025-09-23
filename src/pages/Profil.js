// import React, { useState } from "react";

// export default function ProfilePage() {
//   const [form, setForm] = useState({
//     name: "Coach Interface",
//     email: "coach@example.com",
//     password: "",
//     photo: "/default-avatar.png",
//     notifEmail: true,
//     notifPush: false,
//   });

//   // ✅ Gestion des champs texte et checkbox
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // ✅ Gestion de l’upload de photo
//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Crée une URL temporaire pour l’aperçu
//       const imageUrl = URL.createObjectURL(file);
//       setForm((prev) => ({ ...prev, photo: imageUrl }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Profil mis à jour :", form);
//     alert("Profil enregistré avec succès !");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       {/* ✅ Aperçu en direct */}
//       <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
//         <img
//           src={form.photo}
//           alt="avatar"
//           className="w-16 h-16 rounded-full border object-cover"
//         />
//         <div>
//           <h2 className="text-lg font-bold text-gray-800">{form.name}</h2>
//           <p className="text-sm text-gray-500">{form.email}</p>
//         </div>
//       </div>

//       {/* ✅ Formulaire */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4">
//         <h2 className="text-xl font-bold text-teal-600">Modifier mon profil</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Upload photo */}
//           <div>
//             <label className="block text-sm font-medium">Photo de profil</label>
//             <div className="flex items-center gap-4 mt-2">
//               <img
//                 src={form.photo}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full border object-cover"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="text-sm"
//               />
//             </div>
//           </div>

//           {/* Nom */}
//           <div>
//             <label className="block text-sm font-medium">Nom</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           {/* Mot de passe */}
//           <div>
//             <label className="block text-sm font-medium">Mot de passe</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-3 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           {/* Notifications */}
//           <div className="space-y-2">
//             <h3 className="text-sm font-medium">Notifications</h3>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="notifEmail"
//                 checked={form.notifEmail}
//                 onChange={handleChange}
//               />
//               Email
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="notifPush"
//                 checked={form.notifPush}
//                 onChange={handleChange}
//               />
//               Push
//             </label>
//           </div>

//           {/* Bouton */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
