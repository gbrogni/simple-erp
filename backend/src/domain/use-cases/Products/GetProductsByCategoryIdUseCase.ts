import Product from '@/domain/models/Product';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';

interface GetProductsByCategoryIdUseCaseRequest {
    categoryId: string;
}

interface GetProductByIdUseCaseResponse {
    products: Product[];
}

export class GetProductsByCategoryIdUseCase {
    constructor(private productsRepository: ProductRepository) { }

    async execute({ categoryId }: GetProductsByCategoryIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
        const products: Product[] = await this.productsRepository.getProductsByCategoryId(categoryId);

        return { products };
    }

}