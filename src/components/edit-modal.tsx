'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { adjustInventory, getInventory } from '@/services/inventory.service';
import { fetchProduct, patchProduct } from '@/services/products.service';
import { Product } from '@/types/products.type';

type InventoryRow = {
    id: string;
    productId: string;
    warehouseId: string;
    onHand: number;
    version: number;
};

export default function EditModal({
    isOpen,
    setIsOpen,
    product,
}: {
    product: Product;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(Number(product.price));
    const [stock, setStock] = useState(Number(product.available));
    const [initialStock, setInitialStock] = useState(Number(product.available));
    const [warehouseId, setWarehouseId] = useState('');
    const [version, setVersion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingInventory, setLoadingInventory] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isOpen || !product.id) return;

        let cancelled = false;

        const loadProduct = async () => {
            setLoadingInventory(true);

            try {
                setName(product.name);
                setPrice(Number(product.price));

                const { data: inventoryData, res: inventoryRes } =
                    await getInventory(`productId=${encodeURIComponent(product.id)}`);

                if (!inventoryRes.ok) {
                    alert('Failed to fetch inventory');
                    return;
                }

                const inventoryRow: InventoryRow | undefined =
                    inventoryData.data.items.find(
                        (item: InventoryRow) => item.warehouseId === 'w1'
                    );

                if (!inventoryRow) {
                    alert('Inventory row not found in warehouse w1');
                    return;
                }

                if (cancelled) return;

                setWarehouseId(inventoryRow.warehouseId);
                setVersion(inventoryRow.version);
                setStock(inventoryRow.onHand);
                setInitialStock(inventoryRow.onHand);
            } catch (error) {
                console.error(error);
                alert('Something went wrong while loading inventory');
            } finally {
                if (!cancelled) setLoadingInventory(false);
            }
        };

        loadProduct();

        return () => {
            cancelled = true;
        };
    }, [isOpen, product.id, product.name, product.price]);

    const applyHandler = async () => {
        if (loading || loadingInventory) return;

        if (!name.trim()) {
            alert('Product name is required');
            return;
        }

        if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
            alert('Price must be greater than 0');
            return;
        }

        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
            alert('Stock must be a non-negative integer');
            return;
        }

        if (!warehouseId) {
            alert('Warehouse not found');
            return;
        }

        setLoading(true);

        try {
            // Calculate the stock change
            const delta = Number(stock) - initialStock;

            // Update product details only if they changed
            const nameChanged = name.trim() !== product.name;
            const priceChanged = Number(price) !== Number(product.price);

            if (nameChanged || priceChanged) {
                const productResult = await patchProduct(
                    product.id,
                    {
                        name: name.trim(),
                        price: Number(price),
                    },
                    version
                );

                if (!productResult.res.ok) {
                    alert('Failed to update product');
                    return;
                }
            }

            // Adjust inventory only if stock changed
            if (delta !== 0) {
                const inventoryResult = await adjustInventory({
                    productId: product.id,
                    warehouseId,
                    delta,
                    expectedVersion: version,
                });

                if (inventoryResult.res.status === 409) {
                    alert('Inventory changed. Please reopen the modal and try again.');
                    await queryClient.invalidateQueries({
                        queryKey: ['products'],
                    });
                    return;
                }

                if (!inventoryResult.res.ok) {
                    alert('Product details may have been updated, but inventory adjustment failed');
                    return;
                }
            }

            await queryClient.invalidateQueries({
                queryKey: ['products'],
            });

            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="w-dvw flex items-center justify-center h-dvh bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md">
            <div className="p-3 bg-B rounded-2xl w-90">
                <h2 className="flex justify-center">Edit product</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        applyHandler();
                    }}
                    className="flex flex-col mt-3 gap-3"
                >
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-A rounded-xl px-5 py-2 outline-0 placeholder:text-xs"
                        placeholder="Title..."
                        type="text"
                        required
                    />

                    <div className="w-full flex items-center gap-2 ps-2 whitespace-nowrap">
                        Stock:
                        <input
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="bg-A rounded-xl px-5 py-2 outline-0 w-full block placeholder:text-xs"
                            min={0}
                            step={1}
                            placeholder="Stock..."
                            type="number"
                            required
                            disabled={loadingInventory}
                        />
                    </div>

                    <p className="text-xs opacity-60">
                        Current stock: {initialStock}
                        {' · '}
                        Change: {Number(stock) - initialStock >= 0 ? '+' : ''}
                        {Number(stock) - initialStock}
                    </p>

                    <div className="w-full flex items-center gap-2 ps-2 whitespace-nowrap">
                        Price: $
                        <input
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="bg-A rounded-xl px-5 py-2 outline-0 w-full block placeholder:text-xs"
                            min={0.01}
                            step="any"
                            placeholder="Price..."
                            type="number"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3 justify-center px-5 my-5">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="btn btn-sm btn-error w-1/2"
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-sm btn-accent w-1/2"
                            disabled={loading || loadingInventory}
                        >
                            {loading ? 'Applying...' : loadingInventory ? 'Loading...' : 'Apply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}