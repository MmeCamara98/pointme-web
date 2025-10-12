import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/authSlice';
import { FaQrcode, FaUserFriends } from 'react-icons/fa';
import { FileText,Eye,EyeOff} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/person.png';
import bull1 from '../assets/bull1.png';
import bull2 from '../assets/bull2.png';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        dispatch(loginSuccess());
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Identifiants incorrects.'));
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-teal-600 to-white">
      
      {/* Côté gauche - Partie verte avec gradient */}
      <div className="hidden lg:flex w-1/2  text-white relative overflow-hidden">
        
        {/* Blob orange 1 - en haut à gauche */}
        <img 
          src={bull2} 
          alt="" 
          className="absolute top-[40px] left-[120px]  transform -translate-x-1/2  h-[224.25] opacity-90 z-0" 
        />
        
        {/* Blob orange 2 - au centre pour la personne */}
        <img 
          src={bull1} 
          alt="" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[492.29px] h-auto opacity-95 z-0 mt-4" 
        />

        {/* Container pour tout le contenu */}
        <div className="relative z-10 w-full h-full flex flex-col p-12">
          
          {/* Texte en haut à gauche */}
          <div className="absolute  left-10">
            <div className="inline-block   px-8 py-3 mb-1">
              <h1 className="text-5xl font-bold text-white leading-none">Bienvenue à</h1>
            </div>
            <h1 className="text-5xl font-bold mt-1">Easy point-me</h1>
            <p className="text-2xl mt-4 font-light">Le pointage, en toute simplicité.</p>
          </div>

          {/* Carte QR Code */}
        <div className="absolute top-[460px] left-[60px] bg-teal-600/70 backdrop-blur-sm rounded-3xl px-6 py-4 max-w-[250px] shadow-2xl flex items-center gap-4 z-20">
          <div className="bg-white/30 p-3 rounded-xl flex-shrink-0">
            <FaQrcode className="w-8 h-8 text-white" />
          </div>
          <p className="text-base text-sm leading-tight">
            Système de pointage moderne par QR code unique quotidien
          </p>
        </div>

        {/* Carte Gestion */}
        <div className="absolute top-[230px] right-[50px] bg-teal-600/70 backdrop-blur-sm rounded-3xl px-6 py-5 max-w-[240px] shadow-2xl flex items-center gap-4 z-20">
          <div className="bg-white/30 p-3 rounded-xl flex-shrink-0">
            <FaUserFriends className="w-8 h-8 text-white" />
          </div>
          <p className="text-base text-sm leading-tight">
            Une meilleure gestion des pointages
          </p>
        </div>

        {/* Carte Analytics */}
        <div className="absolute bottom-[205px] right-[80px] bg-teal-700/80 backdrop-blur-sm rounded-3xl px-6 py-5 max-w-[240px] shadow-2xl flex items-center gap-4 z-20">
          <div className="bg-white/30 p-3 rounded-xl flex-shrink-0">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <p className="text-base text-sm  leading-tight">
            Analytics en temps réel pour coaches et administrateurs
          </p>
        </div>

          {/* Image de la personne - centrée sur le blob */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
            <img
              src={loginImage}
              alt="Personne avec ordinateur"
              className="w-[600px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Côté droit - Formulaire de connexion */}
      <div className="flex max-w-[550px] lg:w-1/2 items-center justify-center p-8 translate-x-20">
        <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg">
          
          {/* Logo et titre */}
          <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="Logo Easy point-me" className="h-16 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">Connectez vous</h2>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-base font-bold text-gray-900 mb-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 px-3 py-2 text-base text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-0 transition-colors"
                placeholder="adressemail@gmail.com"
                required
              />
            </div>

            <div className="relative">
      <label
        htmlFor="password"
        className="block text-base font-bold text-gray-900 mb-3"
      >
        Mot de passe
      </label>

      {/* Champ de mot de passe */}
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-2xl border-2 border-gray-200 px-3 py-2 text-base text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-0 transition-colors pr-12"
        placeholder="Mot de passe"
        required
      />

      {/* Icône œil */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[52px] transform  item-center-translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none"
      >
        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
      </button>
    </div>

            {/* Mot de passe oublié */}
            <div className="text-left">
              <a href="#" className="text-base font-medium text-gray-900 hover:text-teal-600">
                Mot de passe oublié?
              </a>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold text-lg rounded-2xl px-6 py-4 hover:bg-teal-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Connexion'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;