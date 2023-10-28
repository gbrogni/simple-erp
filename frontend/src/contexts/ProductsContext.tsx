import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface Product {
    id: number;
    name: string;
    description: number;
    color: string;
    productCategory: string;
    price: number;
    promotionalPrice: number;
}

interface CreateProductInput {
    name: string;
    description: string;
    color: string;
    productCategory: string;
    price: number;
}

interface ProductContextType {
    products: Product[];
    fetchProducts: (query?: string) => Promise<void>;
    createProduct: (data: CreateProductInput) => Promise<void>;
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext({} as ProductContextType);

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async (query?: string) => {
        const response = await api.get('/products', {
            params: {
                q: query
            }
        })

        setProducts(response.data.products.products)
    }, []);

    const createProduct = useCallback(
        async (data: CreateProductInput) => {
            const { name, description, color, productCategory, price } = data

            console.log(data)

            const response = await api.post('/products', {
                name,
                description,
                color,
                productCategory,
                price
            })

            setProducts(state => [response.data, ...state])
        }, []);


    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    return (
        <ProductsContext.Provider value={{
            products,
            fetchProducts,
            createProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
}