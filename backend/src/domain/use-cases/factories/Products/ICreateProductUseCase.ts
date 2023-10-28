import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { CreateProductUseCase } from '../../Products/CreateProductUseCase';

export function ICreateProductUseCase() {
    const db = new UnitOfWork();
    const productRepository = new ProductRepository(db);
    const productCategoryRepository = new ProductCategoryRepository(db);
    const useCase = new CreateProductUseCase(productRepository, productCategoryRepository);

    return useCase;
}