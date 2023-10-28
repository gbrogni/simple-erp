import UnitOfWork from '@/infra/db/UnitOfWork';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { DeleteProductUseCase } from '../../Products/DeleteProductUseCase';

export function IDeleteProductUseCase() {
    const db = new UnitOfWork();
    const productRepository = new ProductRepository(db);
    const useCase = new DeleteProductUseCase(productRepository);

    return useCase;
}