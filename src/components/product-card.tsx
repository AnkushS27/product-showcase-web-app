"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { formatPrice, truncateText } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    dispatch({ type: "ADD_ITEM", payload: product })
    toast.success(`${product.title} added to cart!`)
  }

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent>
          <div className="mb-2 absolute top-1 right-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{truncateText(product.title, 60)}</h3>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.rating.count})</span>
          </div>
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
