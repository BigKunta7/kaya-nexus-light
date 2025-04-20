import os
import requests
from dotenv import load_dotenv

# Chargement du token depuis le fichier .env
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO = "BigKunta7/kaya-nexus-light"  # À adapter si besoin
MAX_RUNS = 20

HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

def check_token():
    """Vérifie si le token est valide et fonctionne."""
    url = "https://api.github.com/user"
    r = requests.get(url, headers=HEADERS)
    if r.status_code == 200:
        print(f"✅ Token valide pour l’utilisateur : {r.json()['login']}")
        return True
    else:
        print("❌ Token invalide ou permissions insuffisantes !")
        return False

def list_workflow_runs():
    url = f"https://api.github.com/repos/{REPO}/actions/runs"
    params = {"per_page": MAX_RUNS}
    r = requests.get(url, headers=HEADERS, params=params)
    r.raise_for_status()
    return r.json()["workflow_runs"]

def rerun_failed_runs():
    runs = list_workflow_runs()
    for run in runs:
        status = run["conclusion"]
        run_id = run["id"]
        name = run["name"]
        if status == "failure":
            print(f"Relance du workflow échoué : {name} (run_id={run_id})")
            url = f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}/rerun"
            resp = requests.post(url, headers=HEADERS)
            if resp.status_code == 201:
                print("→ Relancé avec succès !")
            else:
                print(f"→ Échec de la relance : {resp.status_code} {resp.text}")
        else:
            print(f"Workflow OK : {name} (statut={status})")

if __name__ == "__main__":
    if not GITHUB_TOKEN:
        print("❌ Aucun token trouvé dans le fichier .env !")
        exit(1)
    print("=== Vérification du token GitHub ===")
    if not check_token():
        print("Arrêt du script. Vérifie ton token dans le fichier .env.")
        exit(1)
    print("\n=== Statut des derniers workflows ===")
    runs = list_workflow_runs()
    for run in runs:
        print(f"- {run['name']} #{run['run_number']} : {run['conclusion']} (id={run['id']})")
    print("\n=== Relance des runs échoués ===")
    rerun_failed_runs()
