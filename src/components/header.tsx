"use client"

import Link from "next/link"
import { ShoppingCart, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const { state } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Box className="h-6 w-6" />
          <span className="font-bold text-xl">Products Hub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors">
            Cart
          </Link>
        </nav>

        <Button variant="outline" size="sm" asChild className="relative">
          <Link href="/cart">
            <ShoppingCart className="h-4 w-4" />
            {state.itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {state.itemCount}
              </Badge>
            )}
            <span className="sr-only">Shopping cart</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
