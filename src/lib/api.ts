import type { Product } from "./types"

const API_BASE = "https://fakestoreapi.com"

// Server-side fetch with better error handling and caching
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      // Enable ISR - revalidate every hour
      next: { revalidate: 3600 },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      // Enable ISR - revalidate every 60 minutes for individual products
      next: { revalidate: 3600 },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/products/categories`, {
      // Categories change rarely - cache for 24 hours
      next: { revalidate: 86400 },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Client-side only functions for dynamic filtering
export async function fetchProductsClient(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}
