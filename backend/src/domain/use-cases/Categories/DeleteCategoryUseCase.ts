import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { isValidUuid } from '../utils/IsValidUuid';

interface DeleteCategoryUseCaseRequest {
    id: string;
}

export class DeleteCategoryUseCase {
    constructor(
        private categoryRepository: ProductCategoryRepository,
        private productRepository: ProductRepository
    ) { }

    async execute({
        id,
    }: DeleteCategoryUseCaseRequest): Promise<void> {

        const existingProductsWithCategory = await this.productRepository.getProductsByCategoryId(id);

        if (existingProductsWithCategory.length > 0) {
            throw new Error(`There are products with this category. Please delete them first.`);
        }

        if (!isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`);
        }

        await this.categoryRepository.deleteCategory(id);

    }

}