export type Producto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const BASE_URL = "https://fakestoreapi.com";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Error en la respuesta HTTP");
  }
  return response.json();
}

export const Api = {
  getProductos: () =>
    fetch(`${BASE_URL}/products`).then((response) => handleResponse<Producto[]>(response)),

  getProductosPorId: (id: number) =>
    fetch(`${BASE_URL}/products/${id}`).then((response) => handleResponse<Producto>(response)),

  crearProducto: (product: Partial<Producto>) =>
    fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }).then((response) => handleResponse<Producto>(response)),

  actualizarProducto: (id: number, product: Partial<Producto>) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }).then((response) => handleResponse<Producto>(response)),

  eliminarProducto: (id: number) =>
    fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" }).then((response) =>
      handleResponse<Producto>(response)
    ),
};
