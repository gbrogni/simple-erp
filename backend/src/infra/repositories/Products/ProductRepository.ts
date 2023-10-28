import Product from '@/domain/models/Product';
import { IProductRepository } from '@/domain/repository/Products/IProductRepository';
import DatabaseConnection from '@/infra/db/Connection';


export class ProductRepository implements IProductRepository {
    constructor(private connection: DatabaseConnection) { }

    async create(product: Product): Promise<void> {
        const query = 'INSERT INTO products (id, name, description, color, productCategory, price, promotionalPrice) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [product.id, product.name, product.description, product.color, product.productCategory.id, product.price, product.promotionalPrice];
        await this.connection.query(query, values, false);
    }

    async getProductById(productId: string): Promise<Product> {
        const query = "SELECT * FROM products where id = $1";
        const values = [productId];
        try {
            const [productData] = await this.connection.query(query, values, false);
            if (!productData) {
                throw new Error("Invalid product id");
            }
            return this.mapToProduct(productData);
        } catch (error) {
            throw new Error("Error getting product by id");
        }
    }

    async getProducts(): Promise<Product[]> {
        const query = "SELECT * FROM products";
        const productsData = await this.connection.query(query, [], false);
        return productsData.map((productData: Product) => this.mapToProduct(productData));
    }

    async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
        const query = "SELECT * FROM products where productCategory = $1";
        const values = [categoryId];
        try {
            const productsData = await this.connection.query(query, values, false);
            return productsData.map((productData: Product) => this.mapToProduct(productData));
        } catch (error) {
            throw new Error("Error getting products by category id");
        }
    }

    async deleteProduct(productId: string): Promise<void> {
        const query = "DELETE FROM products where id = $1";
        const values = [productId];
        try {
            await this.connection.query(query, values, false);
        } catch (error) {
            throw new Error("Error deleting product");
        }
    }

    async updateProduct(product: Product): Promise<void> {
        const query = "UPDATE products SET name = $1, description = $2, color = $3, productCategory = $4, price = $5, promotionalPrice = $6 WHERE id = $7";
        const values = [product.name, product.description, product.color, product.productCategory.id, product.price, product.promotionalPrice, product.id];
        try {
            await this.connection.query(query, values, false);
        } catch (error) {
            throw new Error("Error updating product");
        }
    }

    private mapToProduct(productData: Product): Product {
        return new Product(productData.id, productData.name, productData.description, productData.color, productData.productCategory, productData.price, productData.promotionalPrice as number);
    }
}