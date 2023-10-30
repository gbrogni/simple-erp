import ProductCategory from '@/domain/models/ProductCategory';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';

interface GetCategoriesUseCaseResponse {
    categories: ProductCategory[];
}

export class GetCategoriesUseCase {
    constructor(private productCategoryRepository: ProductCategoryRepository) {}

    async execute(): Promise<GetCategoriesUseCaseResponse> {
        const categories: ProductCategory[] = await this.productCategoryRepository.getProductCategories();

        return { categories };
    }

}