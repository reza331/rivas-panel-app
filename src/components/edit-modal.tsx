import { patchProduct } from "@/services/products.service";
import { Product } from "@/types/products.type";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function EditModal({ isOpen, setIsOpen, product }: { product: Product, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {

    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [stock, setStock] = useState(product.stock)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()


    const applyHandler = async () => {
        if (loading) return
        setLoading(true)
        const result = await patchProduct(product.id, { name, price: Number(price), stock: Number(stock) })
        if (!result.res.ok) {
            alert('something went wrong')
            setLoading(false)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['products'] })
        setLoading(false)
        setIsOpen(false)
    }

    useEffect(() => {
        setName(product.name)
        setPrice(product.price)
        setStock(product.stock)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className='w-dvw flex items-center justify-center h-dvh bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md'>
            <div className="p-3 bg-B rounded-2xl w-90">
                <h2 className="flex justify-center">Edit product</h2>
                <form className="flex flex-col mt-3 gap-3">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="bg-A rounded-xl px-5 py-2 outline-0 placeholder:text-xs" placeholder="Title ..." type="text" />
                    <div className="w-full flex items-center gap-2 ps-2 whitespace-nowrap">
                        Stock: <input onChange={(e) => setStock(Number(e.target.value))} value={stock} className="bg-A rounded-xl px-5 py-2 outline-0 w-full block placeholder:text-xs" min={0} placeholder="Stock ..." type="number" />
                    </div>
                    <div className="w-full flex items-center gap-2 ps-2 whitespace-nowrap">
                        Price: $<input onChange={(e) => setPrice(e.target.value)} value={price} className="bg-A rounded-xl px-5 py-2 outline-0 w-full block placeholder:text-xs" min={0} placeholder="Price ..." type="number" />
                    </div>
                    <div className="flex items-center gap-3 justify-center px-5 my-5">
                        <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-error w-1/2">Cancel</button>
                        <button onClick={() => applyHandler()} className="btn btn-sm btn-accent w-1/2">Apply</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
