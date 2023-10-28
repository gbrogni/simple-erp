import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { isValidUuid } from '../utils/IsValidUuid';

interface DeleteProductUseCaseRequest {
    id: string;
}

export class DeleteProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute({
        id,
    }: DeleteProductUseCaseRequest): Promise<void> {

        if (!isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`);
        }

        await this.productRepository.deleteProduct(id);

    }

}