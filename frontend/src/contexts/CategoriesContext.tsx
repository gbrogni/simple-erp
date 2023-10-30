import { ReactNode, useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';
import { Category } from '../interfaces/Category';

interface CreateCategoryInput {
    name: string;
    discount: number;
}

interface CategoryContextType {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    createCategory: (data: CreateCategoryInput) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
}

interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesContext = createContext({} as CategoryContextType);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = useCallback(async () => {
        const response = await api.get('/categories', {
        });

        setCategories(response.data.categories.categories);
    }, []);

    const createCategory = useCallback(
        async (data: CreateCategoryInput) => {
            const { name, discount } = data;

            const response = await api.post('/categories', {
                name,
                discount
            });

            fetchCategories();

            setCategories(state => [response.data, ...state]);
        }, [fetchCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const deleteCategory = useCallback(
        async (categoryId: string) => {
            console.log(categoryId)
          await api.delete(`/categories/${categoryId}`);
    
          setCategories((state) => state.filter((category) => category.id !== categoryId));
        },
        []
      );
    
      useEffect(() => {
        fetchCategories();
      }, [fetchCategories]);
    

    return (
        <CategoriesContext.Provider value={{
            categories,
            fetchCategories,
            createCategory,
            deleteCategory
        }}>
            {children}
        </CategoriesContext.Provider>
    );
}
