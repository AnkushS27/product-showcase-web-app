"use client"

import Image from "next/image"
import { useState } from "react"
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { toast } from "sonner"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product })
    }
    toast.success(`${quantity} ${product.title}${quantity > 1 ? "s" : ""} added to cart!`)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={600}
                height={600}
                className="h-full w-full object-contain p-8"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add {quantity} to Cart - {formatPrice(product.price * quantity)}
              </Button>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High-quality materials</li>
                  <li>• Fast shipping available</li>
                  <li>• 30-day return policy</li>
                  <li>• Customer support included</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
