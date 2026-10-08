import type { Category, Product } from "@/types";

const API_URLS = [
  process.env.BAZARDOR_API_URL,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((url): url is string => Boolean(url));

async function request<T>(path: string): Promise<T | null> {
  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 3600 },
      });

      if (response.ok) return (await response.json()) as T;
    } catch {
      // Continue with the next configured API host.
    }
  }

  return null;
}

export async function getProducts() {
  return (await request<Product[]>("/products")) ?? [];
}

export async function getProductsByCategory(category: string) {
  return (await request<Product[]>(`/products?category=${encodeURIComponent(category)}`)) ?? [];
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductById(id: number) {
  return request<Product>(`/products/${id}`);
}

export async function getCategories() {
  return (await request<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string) {
  return request<Category>(`/categories/${encodeURIComponent(slug)}`);
}
