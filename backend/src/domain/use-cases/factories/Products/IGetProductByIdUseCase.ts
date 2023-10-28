import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import UnitOfWork from '@/infra/db/UnitOfWork';
import { GetProductByIdUseCase } from '../../Products/GetProductByIdUseCase';

export function IGetProductByIdUseCase() {
    const db = new UnitOfWork();
    const productRepository = new ProductRepository(db);
    const useCase = new GetProductByIdUseCase(productRepository);

    return useCase;
}