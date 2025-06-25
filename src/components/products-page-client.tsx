"use client"

import { useState, useMemo } from "react"
import type { Product, FilterState } from "@/lib/types"
import { filterAndSortProducts } from "@/lib/utils"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, Grid, List } from "lucide-react"

const PRODUCTS_PER_PAGE = 12

interface ProductsPageClientProps {
  initialProducts: Product[]
  categories: string[]
  maxPrice: number
}

export function ProductsPageClient({ initialProducts, categories, maxPrice }: ProductsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    minPrice: 0,
    maxPrice: maxPrice,
    sortBy: "name",
  })

  // Client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, filters)
  }, [initialProducts, filters])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 shrink-0">
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          maxPrice={maxPrice}
          categories={categories}
        />
      </aside>

      <main className="flex-1">
        {/* Mobile Filter and View Controls */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                maxPrice={maxPrice}
                categories={categories}
              />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            <Button
              onClick={() =>
                handleFiltersChange({
                  category: "all",
                  minPrice: 0,
                  maxPrice: maxPrice,
                  sortBy: "name",
                })
              }
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </main>
    </div>
  )
}
