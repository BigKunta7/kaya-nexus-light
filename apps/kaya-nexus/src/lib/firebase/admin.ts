// Initialisation unique de Firebase Admin SDK côté serveur
import { initializeApp, getApps, cert, App, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

let app: App;
if (!getApps().length) {
  app = initializeApp(firebaseAdminConfig);
} else {
  app = getApp();
}

export { app, getAuth };
