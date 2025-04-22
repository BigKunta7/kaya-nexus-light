import React from "react";

export default function Input({ label, type = "text", ...props }) {
  return (
    <label className="block mb-2">
      {label && <span className="block text-sm font-medium mb-1">{label}</span>}
      <input
        type={type}
        className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </label>
  );
}
