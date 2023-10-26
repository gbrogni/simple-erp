import { IProductUseCase } from '../../application/use-cases/IProductUseCase';
import { ProductRepository } from "@/infra/repositories/ProductRepository";
import Product from "../models/Product";
import { calculatePromotionalPrice } from '../utils/calculate-promotional-price';

export class ProductUseCase implements IProductUseCase {

    constructor(private productRepository: ProductRepository) { }

    async CreateProduct(product: Product): Promise<void> {
        const promotionalPrice = calculatePromotionalPrice(product);
        const id = crypto.randomUUID();
        product = Product.create(
            id,
            product.name,
            product.description,
            product.color,
            product.productCategory,
            product.price,
            promotionalPrice,
        )
        await this.productRepository.createProduct(product)
    }

    async GetProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts()
    }

    async GetProductById(id: string): Promise<Product> {
        const product = await this.productRepository.getProductById(id)
        if (!product) {
            throw new Error(`Product with ID ${id} not found`)
        }
        return product
    }

    async DeleteProduct(id: string): Promise<void> {
        if (!this.isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`)
        }
        await this.productRepository.deleteProduct(id)
    }

    async UpdateProduct(id: string, product: Product): Promise<void> {
        if (!this.isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`)
        }
        const promotionalPrice = calculatePromotionalPrice(product);
        product.promotionalPrice = promotionalPrice;
        await this.productRepository.updateProduct(id, product)
    }

    private isValidUuid(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

}
