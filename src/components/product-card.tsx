import { patchProduct } from '@/services/products.service'
import { Product } from '@/types/products.type'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

interface CardProps {
    product: Product,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setProduct: Dispatch<SetStateAction<Product>>
}

export default function ProductCard({ product, setIsOpen, setProduct }: CardProps) {


    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const changeHandler = async (id: string, active: boolean) => {
        if (loading) return
        setLoading(true)
        const result = await patchProduct(id, { active: !active })
        if (!result.res.ok) {
            alert('something went wrong')
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['products'] })
        setLoading(false)
    }

    const openEditor = () => {
        setProduct(product)
        setIsOpen(true)
    }

    return (
        <div className="p-3 rounded-2xl bg-B flex justify-between">
            <div className="flex items-center gap-3">
                <div className="size-16">
                    <img className="size-full object-contain" src={product.images[0]} alt="" />
                </div>
                <div>
                    <div className="text-xs font-semibold">{product.name}</div>
                    <div className="text-xs text-text-A/70 mt-2">${product.price}  </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {/* <input
                    onChange={() => changeHandler(product.id, product.active)}
                    checked={product.active}
                    type="checkbox"
                    className="toggle toggle-sm border-gray-600 bg-gray-500 checked:border-blue-500 checked:bg-blue-400 checked:text-blue-800"
                /> */}
                <button onClick={() => openEditor()} className="btn btn-primary btn-xs">
                    <AiFillEdit />
                </button>
                <button className="btn btn-error btn-xs">
                    <AiFillDelete />
                </button>
            </div>
        </div>
    )
}
