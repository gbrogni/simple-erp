import ProductCategory from '@/domain/models/ProductCategory';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';

interface GetCategoryByIdUseCaseRequest {
    id: string;
}

interface GetCategoryByIdUseCaseResponse {
    category: ProductCategory;
}

export class GetCategoryByIdUseCase {
    constructor(private categoryRepository: ProductCategoryRepository) { }

    async execute({ id }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
        const category: ProductCategory = await this.categoryRepository.getCategoryById(id);

        return { category };
    }

}