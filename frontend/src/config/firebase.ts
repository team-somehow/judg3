import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
