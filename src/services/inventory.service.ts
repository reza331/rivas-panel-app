const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getInventory = async (query: string = '') => {
    try {
        const token = localStorage.getItem('accessToken');

        const res = await fetch(`${apiBaseUrl}/inventory?${query}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        return { data, res };

    } catch (err) {
        console.log('Error => ', err);
        throw err;
    }

};


export const createInventoryRow = async (inventory: {
    productId: string;
    warehouseId: string;
    onHand: number;
}) => {
    try {
        const token = localStorage.getItem('accessToken');

        const res = await fetch(`${apiBaseUrl}/inventory/rows`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(inventory),
        });

        const data = await res.json();
        return { data, res };

    } catch (err) {
        console.log('Error => ', err);
        throw err;
    }
};


export const adjustInventory = async ({ delta, expectedVersion, productId, warehouseId }: {
    productId: string;
    warehouseId: string;
    delta: number;
    expectedVersion: number;
}) => {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(`${apiBaseUrl}/inventory/adjust`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Idempotency-Key': crypto.randomUUID(),
        },
        body: JSON.stringify({ delta, expectedVersion, productId, warehouseId }),
    });

    const data = await res.json();

    return { data, res };
};