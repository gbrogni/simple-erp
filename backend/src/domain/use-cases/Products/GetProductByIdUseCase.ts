import Product from '@/domain/models/Product';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';

interface GetProductByIdUseCaseRequest {
    id: string;
}

interface GetProductByIdUseCaseResponse {
    product: Product;
}

export class GetProductByIdUseCase {
    constructor(private productsRepository: ProductRepository) { }

    async execute({ id }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
        const product: Product = await this.productsRepository.getProductById(id);

        return { product };
    }

}