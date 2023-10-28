import ProductCategory from '@/domain/models/ProductCategory';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';

interface GetCategoriesUseCaseResponse {
    productsCategories: ProductCategory[];
}

export class GetCategoriesUseCase {
    constructor(private productCategoryRepository: ProductCategoryRepository) {}

    async execute(): Promise<GetCategoriesUseCaseResponse> {
        const productsCategories: ProductCategory[] = await this.productCategoryRepository.getProductCategories();

        return { productsCategories };
    }

}