import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Analytique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Rapports récents</h2>
          <ul className="list-disc list-inside text-gray-200">
            <li>Performance trimestrielle (Q1 2025)</li>
            <li>Analyse des ventes</li>
            <li>Prévisions IA</li>
          </ul>
        </div>
        <div className="bg-black/40 rounded-xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Statistiques clés</h2>
          <div className="flex gap-4">
            <div className="bg-indigo-700 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">+18 %</div>
              <div className="text-xs">Croissance</div>
            </div>
            <div className="bg-indigo-500 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">1,2M</div>
              <div className="text-xs">Chiffre d'affaires</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
