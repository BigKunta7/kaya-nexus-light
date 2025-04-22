import React from "react";

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Gestion Financière</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Transactions récentes</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-300">
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-left">Montant</th>
                <th className="px-2 py-1 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">20/04/2025</td>
                <td className="px-2 py-1">+1 200 €</td>
                <td className="px-2 py-1">Facture</td>
              </tr>
              <tr className="hover:bg-indigo-900/30">
                <td className="px-2 py-1">18/04/2025</td>
                <td className="px-2 py-1">-300 €</td>
                <td className="px-2 py-1">Achat</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-black/40 rounded-xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Synthèse</h2>
          <div className="flex gap-4">
            <div className="bg-indigo-700 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">+3 200 €</div>
              <div className="text-xs">Solde</div>
            </div>
            <div className="bg-indigo-500 text-white rounded-lg px-4 py-2 text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs">Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
