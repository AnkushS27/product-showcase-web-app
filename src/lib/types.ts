export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface FilterState {
  category: string
  minPrice: number
  maxPrice: number
  sortBy: "price-asc" | "price-desc" | "rating" | "name"
}
