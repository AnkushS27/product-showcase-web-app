"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import type { FilterState } from "@/lib/types"

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  maxPrice: number
  categories: string[] 
}

export function FilterSidebar({ filters, onFiltersChange, maxPrice, categories }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])

  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice])
  }, [filters.minPrice, filters.maxPrice])

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category })
  }

  const handleSortChange = (sortBy: FilterState["sortBy"]) => {
    onFiltersChange({ ...filters, sortBy })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyPriceFilter = () => {
    onFiltersChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }

  const resetFilters = () => {
    const resetFilters: FilterState = {
      category: "all",
      minPrice: 0,
      maxPrice: maxPrice,
      sortBy: "name",
    }
    onFiltersChange(resetFilters)
    setPriceRange([0, maxPrice])
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-4">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={maxPrice}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <Button onClick={applyPriceFilter} size="sm" className="w-full">
            Apply Price Filter
          </Button>
        </div>

        {/* Reset Filters */}
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
