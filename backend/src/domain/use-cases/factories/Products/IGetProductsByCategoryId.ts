import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import UnitOfWork from '@/infra/db/UnitOfWork';
import { GetProductsByCategoryIdUseCase } from '../../Products/GetProductsByCategoryIdUseCase';

export function IGetProductsByCategoryIdUseCase() {
    const db = new UnitOfWork();
    const productRepository = new ProductRepository(db);
    const useCase = new GetProductsByCategoryIdUseCase(productRepository);

    return useCase;
}