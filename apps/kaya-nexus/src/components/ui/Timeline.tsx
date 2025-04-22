import React from "react";

/**
 * Composant Timeline pour afficher une frise d’événements (historique, logs, etc.)
 * @param {object} props
 * @param {{title: string, date: string, description: string}[]} props.events - Liste des événements à afficher
 * @returns {JSX.Element}
 * @example
 * <Timeline events={[{title: 'Création', date: '2025-01-01', description: 'Projet créé'}]} />
 */
export default function Timeline({ events = [] }: { events?: {title: string, date: string, description: string}[] }) {
  return (
    <ol className="relative border-l-2 border-indigo-600 ml-4">
      {events.map((event, idx) => (
        <li key={idx} className="mb-10 ml-6">
          <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full ring-8 ring-indigo-100">
            <span className="text-white font-bold">{idx + 1}</span>
          </span>
          <h3 className="font-semibold text-lg text-indigo-700">{event.title}</h3>
          <p className="text-gray-500 text-sm">{event.date}</p>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
