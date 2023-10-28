import Product from '@/domain/models/Product';
import ProductCategory from '@/domain/models/ProductCategory';
import { CalculatePromotionalPrice } from '../utils/CalculatePromotionalPrice';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { isValidUuid } from '../utils/IsValidUuid';

interface UpdateProductUseCaseRequest {
    id: string;
    name: string;
    description: string;
    color: string;
    productCategory: ProductCategory;
    price: number;
    promotionalPrice?: number;
}

interface UpdateProductUseCaseResponse {
    product: Product;
}

export class UpdateProductUseCase {
    constructor(
        private productCategoryRepository: ProductCategoryRepository,
        private productRepository: ProductRepository
    ) { }

    async execute({
        id,
        name,
        description,
        color,
        productCategory,
        price
    }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {

        const existingProductCategory: ProductCategory = await this.productCategoryRepository.getCategoryById(productCategory.id);

        if (!existingProductCategory) {
            throw new Error(`Product category not found: ${productCategory.id}`);
        }

        const product: Product = {
            id,
            name,
            description,
            color,
            productCategory,
            price,
            promotionalPrice: CalculatePromotionalPrice(price, existingProductCategory)
        };

        if (!isValidUuid(id)) {
            throw new Error(`Invalid UUID: ${id}`);
        }

        await this.productRepository.updateProduct(product);

        return { product };
    }

}