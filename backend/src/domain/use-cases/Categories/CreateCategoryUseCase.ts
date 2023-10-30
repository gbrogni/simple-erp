import ProductCategory from '@/domain/models/ProductCategory';
import { randomUUID } from 'crypto';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';

interface CreateCategoryUseCaseRequest {
    name: string;
    discount: number;
}

interface CreateCategoryUseCaseResponse {
    category: ProductCategory;
}

export class CreateCategoryUseCase {
    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }


    async execute({
        name,
        discount
    }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {

        const id = randomUUID();

        const category: ProductCategory = {
            id,
            name,
            discount
        };

        await this.productCategoryRepository.create(category);

        return { category };
    }

}