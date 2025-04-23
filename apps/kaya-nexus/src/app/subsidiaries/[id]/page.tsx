"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function SubsidiaryProfilePage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profil de la filiale</h1>
      <p className="mb-4 text-gray-300">Détail et gestion de la filiale <span className="font-semibold text-indigo-400">{id}</span>.</p>
      {/* Infos filiale, équipe, stats, actions à venir */}
    </div>
  );
}
