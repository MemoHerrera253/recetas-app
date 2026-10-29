export async function buscarProductoPorCodigo(codigo) {
  const url = `https://world.openfoodfacts.org/api/v2/product/${codigo}.json?fields=product_name,brands,quantity`;
  const data = await (await fetch(url)).json();
  return data.status === 1 ? data.product : null;
}