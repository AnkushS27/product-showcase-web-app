import { fetchProducts, fetchCategories } from "@/lib/api"
import { ProductsPageClient } from "@/components/products-page-client"

// This page uses SSR - rendered on each request
export default async function ProductsPage() {
  // Fetch fresh data on each request (SSR)
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

  const maxPrice = Math.max(...products.map((p) => p.price), 1000)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground">Browse our complete collection of {products.length} products</p>
        </div>

        <ProductsPageClient initialProducts={products} categories={categories} maxPrice={Math.ceil(maxPrice)} />
      </div>
    </div>
  )
}

// Force SSR - disable static generation
export const dynamic = "force-dynamic"
