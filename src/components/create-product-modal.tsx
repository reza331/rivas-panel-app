
'use client'

import { createInventoryRow } from "@/services/inventory.service";
import { createProduct } from "@/services/products.service";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type CreateProductForm = {
    name: string;
    sku: string;
    price: number;
    stock: number;
};

export default function CreateModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductForm>();

    if (!isOpen) return null;

    const onSubmit = async (values: CreateProductForm) => {
        const product = {
            name: values.name.trim(),
            sku: values.sku.trim(),
            price: values.price,
        };

        const stock = values.stock;

        try {
            // Step 1: Create product
            const { data, res } = await createProduct(product);

            if (!res.ok) {
                alert('Failed to create product');
                return;
            }

            const productId = data.data.id;

            // Step 2: Create initial inventory
            const { res: inventoryRes } = await createInventoryRow({
                productId,
                warehouseId: 'w1',
                onHand: stock,
            });

            if (!inventoryRes.ok) {
                alert('Product created, but inventory creation failed');
                return;
            }

            // Both operations succeeded
            alert('Product created successfully');
            setIsOpen(false);

        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <div className="w-dvw flex items-center justify-center h-dvh bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md">
            <div className="p-3 bg-B rounded-2xl w-90">
                <h2 className="flex justify-center">
                    Create product
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col mt-3 gap-3"
                >
                    <div>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                validate: value =>
                                    !!value.trim() || "Name cannot be empty",
                            })}
                            className="bg-A p-2 outline-0 w-full"
                            type="text"
                            placeholder="Name..."
                        />
                        {errors.name && (
                            <p className="text-error text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("sku", {
                                required: "SKU is required",
                                validate: value =>
                                    !!value.trim() || "SKU cannot be empty",
                            })}
                            className="bg-A p-2 outline-0 w-full"
                            type="text"
                            placeholder="SKU..."
                        />
                        {errors.sku && (
                            <p className="text-error text-xs mt-1">
                                {errors.sku.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                                min: {
                                    value: 0.01,
                                    message: "Price must be greater than 0",
                                },
                                validate: value =>
                                    Number.isFinite(value) ||
                                    "Enter a valid price",
                            })}
                            className="bg-A p-2 outline-0 w-full"
                            type="number"
                            min="0.01"
                            step="any"
                            placeholder="Price..."
                        />
                        {errors.price && (
                            <p className="text-error text-xs mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("stock", {
                                required: "Stock is required",
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: "Stock cannot be negative",
                                },
                                validate: value =>
                                    Number.isInteger(value) ||
                                    "Stock must be an integer",
                            })}
                            className="bg-A p-2 outline-0 w-full"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Initial stock..."
                        />
                        {errors.stock && (
                            <p className="text-error text-xs mt-1">
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-center gap-5">
                        <button
                            onClick={() => setIsOpen(false)}
                            type="button"
                            className="btn btn-error btn-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-accent btn-sm"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
