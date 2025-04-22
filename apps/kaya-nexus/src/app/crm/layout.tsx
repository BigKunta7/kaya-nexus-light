import React from "react";
import Sidebar from "../../components/ui/Sidebar";

export default function CRMPageLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-gray-950 to-indigo-950">
        {children}
      </main>
    </div>
  );
}
