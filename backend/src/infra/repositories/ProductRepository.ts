import DatabaseConnection from "@/infra/db/DatabaseConnect";
import Product from "@/domain/models/Product";
import { IProductRepository } from "@/domain/repository/IProductRepository";

export class ProductRepository implements IProductRepository {
    constructor(private connection: DatabaseConnection) { }

    async createProduct(product: Product): Promise<void> {
        await this.connection.query(
            'INSERT INTO products (id, name, description, color, productCategory, price, promotionalPrice) VALUES (${id}, ${name}, ${description}, ${color}, ${productCategory}, ${price}, ${promotionalPrice})',
            product);
    }

    async getProductById(productId: string): Promise<Product> {
        const [productData] = await this.connection.query("SELECT * FROM products where id = $1", [productId])
        if (!productData) {
            throw new Error("Invalid driver id");
        }
        return new Product(productData.id, productData.name, productData.description, productData.color, productData.productCategory, productData.price, productData.promotionalPrice);
    }

    async getProducts(): Promise<Product[]> {
        const productsData = await this.connection.query("SELECT * FROM products")
        return productsData.map((productData: Product) => {
            return new Product(productData.id, productData.name, productData.description, productData.color, productData.productCategory, productData.price, productData.promotionalPrice)
        })
    }

}