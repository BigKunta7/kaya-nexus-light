/**
 * Vérification automatisée des secrets GitHub Actions requis pour le déploiement Vercel.
 * Usage : node check-github-secrets.js <github_token> <repo_owner> <repo_name>
 *
 * Sécurité : NE JAMAIS exposer le token dans le code source ou les logs publics !
 *
 * @module CheckGithubSecrets
 */
import fetch from 'node-fetch';

const REQUIRED_SECRETS = [
  'VERCEL_TOKEN',
  'VERCEL_ORG_ID',
  'VERCEL_PROJECT_ID',
];

function isSecretsResponse(obj: any): obj is { secrets?: { name: string }[] } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (
      obj.secrets === undefined ||
      (
        Array.isArray(obj.secrets) &&
        obj.secrets.every((s: any) => typeof s.name === 'string')
      )
    )
  );
}

async function checkSecrets(token: string, owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/secrets`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Erreur API GitHub : ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  if (!isSecretsResponse(data)) {
    throw new Error('Réponse inattendue de l’API GitHub');
  }
  const secrets = data.secrets?.map((s) => s.name) || [];
  const missing = REQUIRED_SECRETS.filter((key) => !secrets.includes(key));
  if (missing.length === 0) {
    console.log('✅ Tous les secrets requis sont présents.');
  } else {
    console.warn('❌ Secrets manquants :', missing);
    process.exit(1);
  }
}

// Exécution CLI
if (require.main === module) {
  const [token, owner, repo] = process.argv.slice(2);
  if (!token || !owner || !repo) {
    console.error('Usage : node check-github-secrets.js <github_token> <repo_owner> <repo_name>');
    process.exit(1);
  }
  checkSecrets(token, owner, repo).catch((e) => {
    console.error('Erreur de vérification :', e);
    process.exit(1);
  });
}
