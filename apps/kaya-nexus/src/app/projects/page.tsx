'use client';
import React from "react";
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectsPage() {
  const { user } = useAuth();
  if (!user) {
    return <div className="p-8"><h1 className="text-2xl font-bold">Accès refusé</h1></div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Gestion des Projets</h1>
      <div className="mt-4 p-4 bg-black/50 rounded-lg">Calendrier des projets</div>
    </div>
  );
}
