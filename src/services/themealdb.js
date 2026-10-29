const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function listarCategorias() {
  const data = await (await fetch(`${BASE}/categories.php`)).json();
  return data.categories ?? [];
}

export async function recetasPorIngrediente(ingredienteEn) {
  const data = await (await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredienteEn)}`)).json();
  return data.meals ?? [];
}

export async function detalleReceta(id) {
  const data = await (await fetch(`${BASE}/lookup.php?i=${id}`)).json();
  return data.meals?.[0] ?? null;
}