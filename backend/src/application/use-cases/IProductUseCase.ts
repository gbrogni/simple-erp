import Product from "@/domain/models/Product";

export interface IProductUseCase {

    CreateProduct(product: Product): Promise<void>;

    GetProducts(): Promise<Product[]>;

}