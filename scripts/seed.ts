/**
 * Script de seed pour la base de données Supabase (PostgreSQL)
 * Utilise la librairie pg pour injecter des données de test
 * @module SeedDB
 */
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL, // Jamais de secret en dur !
});

async function seed() {
  await client.connect();
  // Exemple : insertion d’un projet
  await client.query(
    `INSERT INTO projects (name, status) VALUES ('Projet Démo', 'active') ON CONFLICT DO NOTHING;`
  );
  await client.end();
  console.log('Seed terminé avec succès.');
}

seed().catch((e) => {
  console.error('Erreur seed:', e);
  process.exit(1);
});
