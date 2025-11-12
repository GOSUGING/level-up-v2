import axios from 'axios';

// Base URL desde .env si existe, si no, por defecto al localhost:8080
const baseURL = import.meta.env?.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL,
});

// Obtiene lista de productos: soporta respuesta plana (array) o paginada (Spring Page)
export async function getProducts() {
  const { data } = await api.get('/api/v1/products');
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.content)) return data.content;
  return [];
}

// Obtiene un producto por ID
export async function getProduct(id) {
  const { data } = await api.get(`/api/v1/products/${id}`);
  return data;
}

