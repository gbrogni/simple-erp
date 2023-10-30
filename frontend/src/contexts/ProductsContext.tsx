import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';
import { Product } from '../interfaces/Product';

interface CreateProductInput {
    name: string;
    description: string;
    color: string;
    productCategory: string;
    price: number;
}

interface ProductContextType {
    products: Product[];
    fetchProducts: () => Promise<void>;
    createProduct: (data: CreateProductInput) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext({} as ProductContextType);

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const createProduct = useCallback(
        async (data: CreateProductInput) => {
            try {
                const { name, description, color, productCategory, price } = data;
                const response = await api.post('/products', {
                    name,
                    description,
                    color,
                    productCategory,
                    price
                });
                setProducts(state => [response.data, ...state]);
            } catch (error) {
                console.error(error);
            }
        }, []);

    const deleteProduct = useCallback(
        async (productId: string) => {
            try {
                await api.delete(`/products/${productId}`);
                setProducts((state) => state.filter((product) => product.id !== productId));
            } catch (error) {
                console.error(error);
            }
        },
        []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ProductsContext.Provider value={{
            products,
            fetchProducts,
            createProduct,
            deleteProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
}