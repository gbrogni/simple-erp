import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { UpdateCategoryUseCase } from '../../Categories/UpdateCategoryUseCase';

export function IUpdateCategoryUseCase() {
    const db = new UnitOfWork();
    const productCategoryRepository = new ProductCategoryRepository(db);
    const productRepository = new ProductRepository(db);
    const useCase = new UpdateCategoryUseCase(productCategoryRepository, productRepository);

    return useCase;
}