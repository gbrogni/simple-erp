import Product  from "../models/Product"

export interface IProductRepository {
  createProduct(product: Product): Promise<void>;

  getProductById(productId: string): Promise<Product>;

  getProducts(): Promise<Product[]>;
}