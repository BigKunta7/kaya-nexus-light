import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-black/40 rounded-xl p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
}
