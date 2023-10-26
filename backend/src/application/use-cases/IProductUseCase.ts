import Product from "@/domain/models/Product";

export interface IProductUseCase {

    CreateProduct({ name, description, color, productCategory, price }: { name: string, description: string, color: string, productCategory: string, price: number }): Promise<void>;

    GetProducts(): Promise<Product[]>;

    GetProductById(id: string): Promise<Product>;

    DeleteProduct(id: string): Promise<void>;

    UpdateProduct(id: string, product: Product): Promise<void>;

}