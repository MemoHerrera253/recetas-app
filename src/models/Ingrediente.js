import {
  collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const coleccion = (uid) => collection(db, 'usuarios', uid, 'ingredientes');

export const Ingrediente = {
  async crear(uid, datos) {
    const ref = await addDoc(coleccion(uid), { ...datos, creado_en: serverTimestamp() });
    return ref.id;
  },

  async listar(uid) {
    const snap = await getDocs(query(coleccion(uid), orderBy('creado_en', 'desc')));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async eliminar(uid, id) {
    await deleteDoc(doc(db, 'usuarios', uid, 'ingredientes', id));
  },
};