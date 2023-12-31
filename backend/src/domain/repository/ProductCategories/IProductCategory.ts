import ProductCategory from '@/domain/models/ProductCategory';


export interface IProductCategoryRepository {

    getProductCategories(): Promise<ProductCategory[]>;

    getCategoryById(id: string): Promise<ProductCategory>;

    create(productCategory: ProductCategory): Promise<void>;

    updateCategory(productCategory: ProductCategory): Promise<void>;

    deleteCategory(id: string): Promise<void>;
}