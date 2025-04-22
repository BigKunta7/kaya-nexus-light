import React from "react";

export default function CRMPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Gestion CRM</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Contacts</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-300">
                <th className="px-2 py-1 text-left">Nom</th>
                <th className="px-2 py-1 text-left">Email</th>
                <th className="px-2 py-1 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">Alice Martin</td>
                <td className="px-2 py-1">alice@exemple.com</td>
                <td className="px-2 py-1">Client</td>
              </tr>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">Bob Dubois</td>
                <td className="px-2 py-1">bob@exemple.com</td>
                <td className="px-2 py-1">Prospect</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-black/40 rounded-xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Statistiques</h2>
          <div className="flex gap-4">
            <div className="bg-indigo-700 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs">Clients</div>
            </div>
            <div className="bg-indigo-500 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs">Prospects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
