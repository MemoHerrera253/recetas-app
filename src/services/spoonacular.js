const KEY = process.env.EXPO_PUBLIC_SPOONACULAR_KEY;

export async function sugerirRecetas(ingredientesEn, cantidad = 6) {
  const lista = encodeURIComponent(ingredientesEn.join(','));
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${lista}&number=${cantidad}&ranking=2&ignorePantry=true&apiKey=${KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Spoonacular ${r.status}`);
  return r.json(); // title, image, usedIngredientCount, missedIngredientCount...
}