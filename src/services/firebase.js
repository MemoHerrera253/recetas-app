import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA6SvYYsdGhNM3_mei0zplcN6hJ5cUbi1Y',
  authDomain: 'apprecetas-b2ef2.firebaseapp.com',
  projectId: 'apprecetas-b2ef2',
  appId: '1:330270253407:web:23c7e6829cb4dcc45bd6ea',
};

const faltantes = Object.entries(firebaseConfig)
  .filter(([, valor]) => !valor)
  .map(([clave]) => clave);

if (faltantes.length > 0) {
  throw new Error(
    `Faltan valores de Firebase (${faltantes.join(', ')}). Revisa el archivo .env y reinicia con: npx expo start -c`
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw e;
  }
}

export { auth };
export const db = getFirestore(app);