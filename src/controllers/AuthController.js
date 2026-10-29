import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { Usuario } from '../models/Usuario';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function traducirError(code) {
  switch (code) {
    case 'auth/email-already-in-use': return 'Ese correo ya está registrado.';
    case 'auth/weak-password': return 'La contraseña es muy débil.';
    case 'auth/invalid-email': return 'El correo no es válido.';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests': return 'Demasiados intentos. Intenta más tarde.';
    case 'auth/network-request-failed': return 'Sin conexión a internet.';
    default: return 'Ocurrió un error. Intenta de nuevo.';
  }
}

export const AuthController = {
  async registrar({ nombre, correo, password, confirmar, aceptoAviso }) {
    if (!nombre.trim() || !correo.trim() || !password) {
      return { ok: false, error: 'Completa todos los campos.' };
    }
    if (!REGEX_CORREO.test(correo.trim())) {
      return { ok: false, error: 'El correo no es válido.' };
    }
    if (password.length < 8) {
      return { ok: false, error: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (password !== confirmar) {
      return { ok: false, error: 'Las contraseñas no coinciden.' };
    }
    if (!aceptoAviso) {
      return { ok: false, error: 'Debes aceptar el aviso de privacidad para registrarte.' };
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, correo.trim().toLowerCase(), password);
      await Usuario.crearPerfil(cred.user.uid, { nombre: nombre.trim(), correo: cred.user.email });
      await signOut(auth); // para mantener el flujo registro → login
      return { ok: true };
    } catch (e) {
      return { ok: false, error: traducirError(e.code) };
    }
  },

  async iniciarSesion({ correo, password }) {
    try {
      const cred = await signInWithEmailAndPassword(auth, correo.trim().toLowerCase(), password);
      const perfil = await Usuario.obtenerPerfil(cred.user.uid);
      return {
        ok: true,
        usuario: { id: cred.user.uid, nombre: perfil?.nombre ?? '', correo: cred.user.email },
      };
    } catch (e) {
      return { ok: false, error: traducirError(e.code) };
    }
  },

  async cerrarSesion() {
    await signOut(auth);
  },
};