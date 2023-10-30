import Product from '@/domain/models/Product';
import ProductCategory from '@/domain/models/ProductCategory';
import { randomUUID } from 'crypto';
import { CalculatePromotionalPrice } from '../utils/CalculatePromotionalPrice';
import { ProductRepository } from '@/infra/repositories/Products/ProductRepository';
import { ProductCategoryRepository } from '@/infra/repositories/ProductsCategory/ProductCategoryRepository';

interface CreateProductUseCaseRequest {
    name: string;
    description: string;
    color: string;
    productCategory: string;
    price: number;
}

interface CreateProductUseCaseResponse {
    product: Product;
}

export class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository,
        private productCategoryRepository: ProductCategoryRepository
    ) { }


    async execute({
        name,
        description,
        color,
        productCategory,
        price
    }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {

        const id = randomUUID();
        const productCategoryFound: ProductCategory = await this.productCategoryRepository.getCategoryById(productCategory)

        const product: Product = {
            id,
            name,
            description,
            color,
            productCategory: productCategoryFound,
            price,
            promotionalPrice: CalculatePromotionalPrice(price, productCategoryFound)
        };

        await this.productRepository.create(product);

        return { product };
    }

}