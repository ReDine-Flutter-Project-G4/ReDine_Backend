import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };
import type { ServiceAccount } from 'firebase-admin/app';

// Initialize Firebase Admin with error handling
let app;
let rtdb;

try {
  app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://redine-dc9f2-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
  
  rtdb = getDatabase(app);
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase Admin:', error);
  
  // Fallback: try with default application credentials
  try {
    app = initializeApp({
      databaseURL: 'https://redine-dc9f2-default-rtdb.asia-southeast1.firebasedatabase.app/'
    });
    rtdb = getDatabase(app);
    console.log('Firebase Admin initialized with default credentials');
  } catch (fallbackError) {
    console.error('Firebase Admin initialization failed completely:', fallbackError);
    throw fallbackError;
  }
}

export { rtdb };
