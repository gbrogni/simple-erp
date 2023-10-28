import ProductCategory from './ProductCategory';

export default class Product {
    id: string;
    name: string;
    description: string;
    color: string;
    productCategory: ProductCategory;
    price: number;
    promotionalPrice?: number;

    constructor(
        id: string,
        name: string,
        description: string,
        color: string,
        productCategory: ProductCategory,
        price: number,
        promotionalPrice: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.productCategory = productCategory;
        this.price = price;
        this.promotionalPrice = promotionalPrice;
    }

}