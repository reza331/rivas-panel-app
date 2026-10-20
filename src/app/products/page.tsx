'use client'
import CreateModal from "@/components/create-product-modal"
import PageControl from "@/components/page-control"
import ProductsGrid from "@/components/products-grid"
import SearchBar from "@/components/search-bar"
import { useState } from "react"


export default function Products() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col p-5 gap-5">
            <div className="flex items-center gap-5">
                <div className="w-full">
                    <SearchBar />
                </div>
                <button onClick={() => setIsOpen(true)} className="btn btn-primary">Add Product</button>
                <PageControl />
            </div>
            <ProductsGrid />
            <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )

}
