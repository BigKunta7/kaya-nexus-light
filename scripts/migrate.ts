/**
 * Script de migration pour la base de données Supabase (PostgreSQL)
 * Utilise la librairie pg pour appliquer des migrations SQL
 * @module MigrateDB
 */
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Vérifie si un fichier est bien un fichier SQL valide (nom et contenu).
 * @param file
 */
function isSqlFile(file: string, dir: string): boolean {
  return (
    typeof file === 'string' &&
    file.endsWith('.sql') &&
    fs.existsSync(path.join(dir, file)) &&
    fs.statSync(path.join(dir, file)).isFile()
  );
}

const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL, // Jamais de secret en dur !
});

async function migrate() {
  if (!process.env.SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL manquant dans les variables d\'environnement.');
  }
  await client.connect();
  const migrationsDir = path.join(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir) || !fs.statSync(migrationsDir).isDirectory()) {
    throw new Error('Dossier migrations introuvable.');
  }
  const files = fs.readdirSync(migrationsDir).filter(f => isSqlFile(f, migrationsDir));
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    if (typeof sql !== 'string' || sql.trim().length === 0) {
      throw new Error(`Fichier SQL vide ou invalide : ${file}`);
    }
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
