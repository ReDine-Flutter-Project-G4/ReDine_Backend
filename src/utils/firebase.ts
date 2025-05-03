import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { readFileSync } from 'fs';
import { join } from 'path';

const keyPath = join(import.meta.dir, '../../serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://redine-dc9f2-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
}

export const rtdb = getDatabase();
