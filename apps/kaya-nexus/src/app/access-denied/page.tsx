"use client";
import React from "react";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">Accès refusé</h1>
      <p className="text-lg text-gray-300 mb-6">Vous n’avez pas la permission d’accéder à cette page.</p>
      <a href="/" className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">Retour à l’accueil</a>
    </div>
  );
}
