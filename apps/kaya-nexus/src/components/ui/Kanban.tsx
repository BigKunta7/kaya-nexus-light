import React from "react";

/**
 * Composant Kanban pour afficher des colonnes de cartes (gestion tâches, tickets, etc.)
 * @param {object} props
 * @param {{id?: string|number, title: string, cards: {id?: string|number, content: string}[]}[]} props.columns - Colonnes et cartes à afficher
 * @returns {JSX.Element}
 * @example
 * <Kanban columns={[{title: 'À faire', cards: [{content: 'Tâche 1'}]}]} />
 */
export default function Kanban({ columns = [] }: { columns?: {id?: string|number, title: string, cards: {id?: string|number, content: string}[]}[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {columns.map((col, idx) => (
        <div key={col.id || idx} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow w-72 min-w-[18rem] p-4 flex flex-col">
          <h2 className="font-semibold text-lg mb-2 text-indigo-700 dark:text-indigo-300">{col.title}</h2>
          <div className="flex-1 flex flex-col gap-2">
            {col.cards && col.cards.length > 0 ? (
              col.cards.map((card, cidx) => (
                <div key={card.id || cidx} className="bg-white dark:bg-gray-900 rounded p-3 shadow text-sm">
                  {card.content}
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">Aucune carte</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
