import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/authSlice';
import { QrCode, BarChart, Users } from 'lucide-react'

import { useNavigate } from "react-router-dom";

import loginImage from '../assets/log.png';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        dispatch(loginSuccess());
        navigate("/dashboard");
      } else {
        dispatch(loginFailure('Identifiants incorrects.'));

      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-teal-600 to-gray-50">
      {/* --- Côté gauche --- */}
      <div className="hidden lg:flex flex-1 flex-col justify-between text-white p-10 relative overflow-hidden">
        
        {/* ==== BLOBS ORANGES ==== */}
       

        {/* Texte d’accueil */}
        <div className="relative z-10">
          <h1 className="text-7xl font-bold">Bienvenue à </h1>
          <h1 className="text-7xl font-bold">
            <span className="text-orange-400">Easy</span> point-me
          </h1>
          <p className="mt-2 text-4xl font-light">Le pointage, en toute</p>
          <p className="mt-2 text-4xl font-light">simplicité.</p>
        </div>

        {/* Image + bulles */}
        <div className="relative flex flex-grow items-center justify-center z-10">
          <img
            src={loginImage}
            alt="Personne utilisant un ordinateur portable"
            className="w-full max-w-lg"
          />

          {/* Bulle 1 */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 transform rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm max-w-xs">
            <div className="flex items-center">
              <QrCode className="h-6 w-6" />
              <span className="ml-2 font-medium">
                Système de pointage moderne par QR code unique quotidien
              </span>
            </div>
          </div>

          {/* Bulle 2 */}
          <div className="absolute right-0 top-[20%] -translate-y-1/2 transform rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm max-w-xs">
            <div className="flex items-center">
              <Users className="h-6 w-6" />
              <span className="ml-2 font-medium">
                Une meilleure gestion des pointages
              </span>
            </div>
          </div>

          {/* Bulle 3 */}
          <div className="absolute right-0 bottom-1/4 -translate-y-1/2 transform rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm max-w-xs">
            <div className="flex items-center">
              <BarChart className="h-6 w-6" />
              <span className="ml-2 font-medium">
                Analytics en temps réel pour coaches et administrateurs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Côté droit --- */}
      <div className="flex w-full lg:w-1/3 items-center justify-center min-h-screen">
        <div className="bg-white p-10 w-150 max-w-sm rounded-2xl shadow relative z-10">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo Easy point-me" className="h-15 mb-10" />
            <h3 className="text-2xl font-bold text-gray-700 mt-5">Connectez-vous</h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="username@gmail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="Mot de passe"
                required
              />
            </div>

            <div className="text-left">
              <a href="#" className="text-sm font-medium text-black hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full text-2xl rounded-xl bg-teal-600 px-6 py-2 font-semibold text-white hover:bg-teal-700 transition disabled:bg-gray-400"
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
