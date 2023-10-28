import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { GetProductsUseCase } from '../../Products/GetProductsUseCase';
import UnitOfWork from '@/infra/db/UnitOfWork';

export function IGetProductsUseCase() {
    const db = new UnitOfWork();
    const productRepository = new ProductRepository(db);
    const useCase = new GetProductsUseCase(productRepository);

    return useCase;
}