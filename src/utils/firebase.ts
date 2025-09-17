import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };
import type { ServiceAccount } from 'firebase-admin/app';

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://redine-dc9f2-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const rtdb = getDatabase(app);
export { rtdb };
