import { auth } from '../services/firebase';
import { Ingrediente } from '../models/Ingrediente';
import { buscarProductoPorCodigo } from '../services/openfoodfacts';

export const IngredienteController = {
  async agregar({ nombre, cantidad, unidad, codigoBarras }) {
    const uid = auth.currentUser?.uid;
    if (!uid) return { ok: false, error: 'Sesión no válida.' };

    const n = Number(cantidad);
    if (!nombre.trim()) return { ok: false, error: 'Escribe el nombre del ingrediente.' };
    if (!Number.isFinite(n) || n <= 0) {
      return { ok: false, error: 'La cantidad debe ser un número mayor a 0.' };
    }

    try {
      await Ingrediente.crear(uid, {
        nombre: nombre.trim(),
        cantidad: n,
        unidad,
        codigo_barras: codigoBarras ?? null,
      });
      return { ok: true };
    } catch {
      return { ok: false, error: 'No se pudo guardar. Revisa tu conexión.' };
    }
  },

  async listar() {
    const uid = auth.currentUser?.uid;
    return uid ? Ingrediente.listar(uid) : [];
  },

  async eliminar(id) {
    const uid = auth.currentUser?.uid;
    if (uid) await Ingrediente.eliminar(uid, id);
  },

  async buscarPorCodigo(codigo) {
    try {
      const producto = await buscarProductoPorCodigo(codigo);
      if (!producto) return { ok: false, error: 'Producto no encontrado.' };
      return { ok: true, nombre: producto.product_name ?? '' };
    } catch {
      return { ok: false, error: 'No se pudo consultar el producto.' };
    }
  },
};