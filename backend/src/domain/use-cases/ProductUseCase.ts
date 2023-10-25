import { IProductUseCase } from '../../application/use-cases/IProductUseCase';
import { ProductRepository } from "@/infra/repositories/ProductRepository";
import Product from "../models/Product";

export class ProductUseCase implements IProductUseCase {

    constructor(private productRepository: ProductRepository) { }

    async CreateProduct(product: Product): Promise<void> {
        product = Product.create(
            product.name,
            product.description,
            product.color,
            product.productCategory,
            product.price,
            product.promotionalPrice,
        )
        await this.productRepository.createProduct(product)
    }
}
