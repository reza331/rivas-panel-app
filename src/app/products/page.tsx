'use client'
import EditModal from "@/components/edit-modal"
import ProductCard from "@/components/product-card"
import SearchBar from "@/components/search-bar"
import useProductsQuery from "@/hooks/api/useProductsQuery"
import { useIsSearching, useSearchActions, useSearchedList } from "@/stores/search-store"
import { Product } from "@/types/products.type"
import { useEffect, useState } from "react"

export default function Products() {

    const { data, isLoading, isError } = useProductsQuery()
    const [isOpen, setIsOpen] = useState(false)
    const [product, setProduct] = useState<Product>({} as Product)
    const isSearching = useIsSearching()
    const searchedList = useSearchedList()
    const { setData } = useSearchActions()

    useEffect(() => {
        if (data?.data.data) {
            setData(data.data.data)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="p-5">Loading ...</div>
        )
    }

    if (isError) {
        return (
            <div className="p-5">Failed to fetch content</div>
        )
    }

    return (
        <div className="flex flex-col p-5 gap-5">
            <SearchBar />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {!isSearching && data?.data.data.map(product => {
                    return (
                        <ProductCard key={product.id} setProduct={setProduct} product={product} setIsOpen={setIsOpen} />
                    )
                })}
                {
                    isSearching && searchedList.map(product => {
                        return (
                            <ProductCard key={product.id} setProduct={setProduct} product={product} setIsOpen={setIsOpen} />
                        )
                    })
                }
            </div>
            <EditModal product={product} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )

}
