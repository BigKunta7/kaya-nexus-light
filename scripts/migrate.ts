/**
 * Script de migration pour la base de données Supabase (PostgreSQL)
 * Utilise la librairie pg pour appliquer des migrations SQL
 * @module MigrateDB
 */
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL, // Jamais de secret en dur !
});

async function migrate() {
  await client.connect();
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await client.query(sql);
    console.log(`Migration appliquée : ${file}`);
  }
  await client.end();
  console.log('Toutes les migrations ont été appliquées.');
}

migrate().catch((e) => {
  console.error('Erreur migration:', e);
  process.exit(1);
});
