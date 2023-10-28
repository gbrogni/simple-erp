import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { UpdateProductUseCase } from '../../Products/UpdateProductUseCase';

export function IUpdateProductUseCase() {
    const db = new UnitOfWork();
    const productCategoryRepository = new ProductCategoryRepository(db);
    const productRepository = new ProductRepository(db);
    const useCase = new UpdateProductUseCase(productCategoryRepository, productRepository);

    return useCase;
}