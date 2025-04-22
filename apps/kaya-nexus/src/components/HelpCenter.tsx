import React from "react";

/**
 * Centre d’aide contextuel Kaya Nexus
 * FAQ, liens doc, contact support, tickets
 */
export default function HelpCenter() {
  return (
    <aside className="fixed right-4 bottom-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-96 max-w-full p-6 z-50">
      <h2 className="text-xl font-bold mb-2">Centre d’aide</h2>
      <ul className="mb-4 list-disc ml-6 text-sm">
        <li>Consultez la <a href="/docs/faq" className="text-indigo-600 underline">FAQ</a></li>
        <li>Documentation technique : <a href="/docs" className="text-indigo-600 underline">/docs</a></li>
        <li>Contact support : <a href="mailto:support@kaya-nexus.com" className="text-indigo-600 underline">support@kaya-nexus.com</a></li>
      </ul>
      <form className="flex flex-col gap-2">
        <label htmlFor="ticket-message" className="text-sm">Envoyer un ticket :</label>
        <textarea id="ticket-message" className="border rounded p-2" rows={3} placeholder="Décrivez votre problème ou question" />
        <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 mt-2">Envoyer</button>
      </form>
    </aside>
  );
}
