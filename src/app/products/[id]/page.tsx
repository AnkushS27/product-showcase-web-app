import { notFound } from "next/navigation"
import { fetchProduct, fetchProducts } from "@/lib/api"
import { ProductDetail } from "@/components/product-detail"

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  const products = await fetchProducts()

  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

// Enable ISR - regenerate page every 60 minutes
export const revalidate = 3600
