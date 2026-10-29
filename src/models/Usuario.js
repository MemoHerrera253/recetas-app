import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export const VERSION_AVISO = '1.1';

export const Usuario = {
  async crearPerfil(uid, { nombre, correo }) {
    await setDoc(doc(db, 'usuarios', uid), {
      nombre,
      correo,
      acepto_aviso: true,
      version_aviso: VERSION_AVISO,
      fecha_consentimiento: serverTimestamp(),
    });
  },

  async obtenerPerfil(uid) {
    const snap = await getDoc(doc(db, 'usuarios', uid));
    return snap.exists() ? snap.data() : null;
  },
};