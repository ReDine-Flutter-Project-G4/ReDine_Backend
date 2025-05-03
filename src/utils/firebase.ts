import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Now resolve the path from the actual file's directory
const keyPath = join(__dirname, '../../serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));
console.log("Resolved path to key:", keyPath);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://redine-dc9f2-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
}

export const rtdb = getDatabase();
