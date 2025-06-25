import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, FilterState } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  const filtered = products.filter((product) => {
    // Category filter
    if (filters.category && filters.category !== "all" && product.category !== filters.category) {
      return false
    }

    // Price range filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false
    }

    return true
  })

  // Sort products
  switch (filters.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating.rate - a.rating.rate)
      break
    case "name":
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  return filtered
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
