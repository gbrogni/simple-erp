import { Category } from "./Category";

export interface Product {
    id: string;
    name: string;
    description: number;
    color: string;
    productCategory: Category;
    price: number;
    promotionalPrice: number;
}
