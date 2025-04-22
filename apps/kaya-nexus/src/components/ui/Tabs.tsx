import React from "react";

export default function Tabs({ tabs, active, onTabChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-800 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 font-semibold rounded-t ${active === tab.key ? "bg-indigo-700 text-white" : "bg-gray-900 text-gray-300 hover:bg-gray-800"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
