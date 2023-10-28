import ProductCategory from '@/domain/models/ProductCategory';
import { CalculatePromotionalPrice } from '../utils/CalculatePromotionalPrice';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { isValidUuid } from '../utils/IsValidUuid';

interface UpdateCategoryUseCaseRequest {
    id: string;
    name: string;
    discount: number;
}

interface UpdateCategoryUseCaseResponse {
    productCategory: ProductCategory;
}

export class UpdateCategoryUseCase {
    constructor(
        private productCategoryRepository: ProductCategoryRepository,
        private productRepository: ProductRepository
    ) { }


    async execute({
        id,
        name,
        discount
    }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {

        const productCategory: ProductCategory = {
            id,
            name,
            discount
        };

        if (!isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`);
        }

        await this.productCategoryRepository.updateCategory(productCategory);

        const products = await this.productRepository.getProductsByCategoryId(productCategory.id);

        if (products) {
            for (const product of products) {
                CalculatePromotionalPrice(product.price, productCategory);
                await this.productRepository.updateProduct(product);
            }
        }

        return { productCategory };
    }

}