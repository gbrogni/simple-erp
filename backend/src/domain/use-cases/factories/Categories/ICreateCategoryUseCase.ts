import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { CreateCategoryUseCase } from '../../Categories/CreateCategoryUseCase';

export function ICreateCategoryUseCase() {
    const db = new UnitOfWork();
    const categoryRepository = new ProductCategoryRepository(db);
    const useCase = new CreateCategoryUseCase(categoryRepository);

    return useCase;
}