import Product  from '../../models/Product';

export interface IProductRepository {
  create(data: Product): Promise<void>;

  getProductById(productId: string): Promise<Product>;

  getProducts(): Promise<Product[]>;

  getProductsByCategoryId(categoryId: string): Promise<Product[]>;

  updateProduct(product: Product): Promise<void>;

  deleteProduct(productId: string): Promise<void>;
}