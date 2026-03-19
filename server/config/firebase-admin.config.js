const admin = require('firebase-admin');

// IMPORTANT: Download your service account key JSON from Firebase Console
// and set the FIREBASE_SERVICE_ACCOUNT_KEY environment variable to its content or path.
// For security, we recommend using environment variables or a secret manager.

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

if (serviceAccount && serviceAccount.project_id) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully');
} else {
  console.warn('Firebase Admin SDK could not be initialized: FIREBASE_SERVICE_ACCOUNT_KEY is missing');
}

module.exports = admin;
