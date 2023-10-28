import ProductCategory from '@/domain/models/ProductCategory';
import { IProductCategoryRepository } from '@/domain/repository/ProductCategories/IProductCategory';
import DatabaseConnection from '@/infra/db/Connection';

export class ProductCategoryRepository implements IProductCategoryRepository {
    constructor(private connection: DatabaseConnection) { }

    async getProductCategories(): Promise<ProductCategory[]> {
        const query = "SELECT * FROM productCategories";
        const categoryData = await this.connection.query(query, [], false);
        return categoryData.map((productData: ProductCategory) => this.mapToProductCategory(productData));
    }

    async getCategoryById(categoryId: string): Promise<ProductCategory> {
        const query = "SELECT * FROM productCategories where id = $1";
        const values = [categoryId];
        try {
            const [categoryData] = await this.connection.query(query, values, false);
            if (!categoryData) {
                throw new Error("Invalid category id");
            }
            return this.mapToProductCategory(categoryData);
        } catch (error) {
            throw new Error("Error getting category by id");
        }
    }

    async updateCategory(productCategory: ProductCategory): Promise<void> {
        const query = "UPDATE productCategories SET name = $1, discount = $2 WHERE id = $3";
        const values = [productCategory.name, productCategory.discount, productCategory.id];
        try {
            await this.connection.query(query, values, true);
        } catch (error) {
            throw new Error("Error updating category");
        }
    }

    async deleteCategory(id: string): Promise<void> {
        const query = "DELETE FROM productCategories where id = $1";
        const values = [id];
        try {
            await this.connection.query(query, values, false);
        } catch (error) {
            throw new Error("Error deleting category");
        }
    }
    
    private mapToProductCategory(productData: ProductCategory): ProductCategory {
        return new ProductCategory(productData.id, productData.name, productData.discount);
    }

}
