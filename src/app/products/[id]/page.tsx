'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { fetchProduct } from '@/lib/api'
import { Product } from '@/lib/types'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function getData() {
      const res = await fetchProduct(params.id as string)
      setProduct(res)
    }

    if (params.id) {
      getData()
    }
  }, [params.id])

  if (!product) return <div>Loading...</div>

  return <ProductDetail product={product} />
}
