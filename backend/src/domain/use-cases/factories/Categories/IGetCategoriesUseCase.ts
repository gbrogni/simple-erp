import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { GetCategoriesUseCase } from '../../Categories/GetCategoriesUseCase';

export function IGetCategoriesUseCase() {
    const db = new UnitOfWork();
    const categoryRepository = new ProductCategoryRepository(db);
    const useCase = new GetCategoriesUseCase(categoryRepository);

    return useCase;
}