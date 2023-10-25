import { ProductRepository } from "@/infra/repositories/ProductRepository";
import { IProductRepository } from "@/domain/repository/IProductRepository";
import Product from "@/domain/models/Product";

export interface IProductUseCase {

    CreateProduct(product: Product): Promise<void>;

}