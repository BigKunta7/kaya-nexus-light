/**
 * Script de seed pour la base de données Supabase (PostgreSQL)
 * Utilise la librairie pg pour injecter des données de test
 * @module SeedDB
 */
import { Client } from 'pg';
import fetch from 'node-fetch';

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL, // Jamais de secret en dur !
});

/**
 * Vérifie si l'objet est de type User attendu pour le seed.
 * @param obj
 */
function isUser(obj: any): obj is { id: string; email: string; name: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string'
  );
}

async function fetchSeedUsers(apiUrl: string): Promise<{ id: string; email: string; name: string }[]> {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data) || !data.every(isUser)) {
    throw new Error('Réponse inattendue du backend pour les utilisateurs.');
  }
  return data;
}

async function seed() {
  await client.connect();
  try {
    const API_URL = process.env.API_URL;
    if (!API_URL) throw new Error('API_URL manquant dans les variables d\'environnement.');
    const users = await fetchSeedUsers(API_URL);
    // Exemple : insertion d’un projet
    await client.query(
      `INSERT INTO projects (name, status) VALUES ('Projet Démo', 'active') ON CONFLICT DO NOTHING;`
    );
    console.log('Utilisateurs à insérer:', users);
  } catch (e) {
    console.error('Erreur lors du seed:', e);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Seed terminé avec succès.');
  }
}

seed().catch((e) => {
  console.error('Erreur seed:', e);
  process.exit(1);
});
