import React from "react";

export default function ProjetsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Gestion des Projets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Projets en cours</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-300">
                <th className="px-2 py-1 text-left">Nom</th>
                <th className="px-2 py-1 text-left">Statut</th>
                <th className="px-2 py-1 text-left">Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">Site Web Kaya</td>
                <td className="px-2 py-1">En cours</td>
                <td className="px-2 py-1">15/05/2025</td>
              </tr>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">App Mobile Nexus</td>
                <td className="px-2 py-1">À venir</td>
                <td className="px-2 py-1">30/06/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-black/40 rounded-xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Statistiques</h2>
          <div className="flex gap-4">
            <div className="bg-indigo-700 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs">Projets actifs</div>
            </div>
            <div className="bg-indigo-500 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs">À venir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
