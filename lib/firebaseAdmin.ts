import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('./servicekey.json')),
    databaseURL: "https://myproject-e140a-default-rtdb.firebaseio.com"
  });
}

export default admin;