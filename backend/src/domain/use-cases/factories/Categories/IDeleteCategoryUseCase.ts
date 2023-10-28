import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { DeleteCategoryUseCase } from '../../Categories/DeleteCategoryUseCase';


export function IDeleteCategoryUseCase() {
    const db = new UnitOfWork();
    const categoryRepository = new ProductCategoryRepository(db);
    const productRepository = new ProductRepository(db);
    const useCase = new DeleteCategoryUseCase(categoryRepository, productRepository);

    return useCase;
}