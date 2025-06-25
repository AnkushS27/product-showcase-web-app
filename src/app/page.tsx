import { Suspense } from "react"
import { fetchProducts, fetchCategories } from "@/lib/api"
import { ProductsPageClient } from "@/components/products-page-client"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"

// This page uses SSG - generated at build time and cached
export default async function HomePage() {
  // Fetch data at build time (SSG)
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

  const maxPrice = Math.max(...products.map((p) => p.price), 1000)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
          <p className="text-lg text-muted-foreground">
            Browse through our curated collection of {products.length} premium products
          </p>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsPageClient initialProducts={products} categories={categories} maxPrice={Math.ceil(maxPrice)} />
        </Suspense>
      </div>
    </div>
  )
}

// Loading component for Suspense
function ProductGridSkeleton() {
  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-80">
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </aside>
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}

// Enable static generation
export const dynamic = "force-static"