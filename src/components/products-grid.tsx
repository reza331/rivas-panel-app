import { useEffect, useState } from 'react'
import EditModal from './edit-modal'
import { useCursor, usePagetActions } from '@/stores/pagination-store';
import useProductsQuery from '@/hooks/api/useProductsQuery';
import { Product } from '@/types/products.type';
import { useSearchParams } from 'next/navigation';
import ProductCard from './product-card';

export default function ProductsGrid() {


    const searchParams = useSearchParams();
    const cursor = useCursor()
    const query = searchParams.get("q") ?? "";
    const { data, isLoading, isError } = useProductsQuery(cursor, query)
    const [isOpen, setIsOpen] = useState(false)
    const [product, setProduct] = useState<Product>({} as Product)
    const { setTotal } = usePagetActions()


    useEffect(() => {
        if (data?.data.data) {
            setTotal(data.data.data.total)
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
        <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.data.data.items.map(product => {
                    return (
                        <ProductCard key={product.id} setProduct={setProduct} product={product} setIsOpen={setIsOpen} />
                    )
                })}
            </div>
            <EditModal product={product} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
