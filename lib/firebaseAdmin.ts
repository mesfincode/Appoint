import admin from 'firebase-admin';
const serviceAccountKey =  JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
  });
}

export default admin;