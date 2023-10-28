import Product from '@/domain/models/Product';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';

interface GetProductsUseCaseResponse {
    products: Product[];
}

export class GetProductsUseCase {
    constructor(private productsRepository: ProductRepository) {}

    async execute(): Promise<GetProductsUseCaseResponse> {
        const products: Product[] = await this.productsRepository.getProducts();

        return { products };
    }

}