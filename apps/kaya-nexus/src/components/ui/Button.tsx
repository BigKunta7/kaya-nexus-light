import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400",
    secondary: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-400",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-200 border border-indigo-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
