import React from "react";

export default function Badge({ children, color = "indigo" }) {
  const colorMap = {
    indigo: "bg-indigo-600 text-white",
    gray: "bg-gray-700 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
    yellow: "bg-yellow-500 text-black",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${colorMap[color]}`}>{children}</span>
  );
}
