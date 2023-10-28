import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { GetCategoryByIdUseCase } from '../../Categories/GetCategoryByIdUseCase';

export function IGetCategoryByIdUseCase() {
    const db = new UnitOfWork();
    const categoryRepository = new ProductCategoryRepository(db);
    const useCase = new GetCategoryByIdUseCase(categoryRepository);

    return useCase;
}