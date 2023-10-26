export default class Product {
    id: string;
    readonly name: string;
    readonly description: string;
    readonly color: string;
    readonly productCategory: string;
    readonly price: number;
    promotionalPrice?: number;

    constructor(
        id: string,
        name: string,
        description: string,
        color: string,
        productCategory: string,
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

    static create(
        id: string,
        name: string,
        description: string,
        color: string,
        productCategory: string,
        price: number,
        promotionalPrice: number,
    ): Product {
        return new Product(id, name, description, color, productCategory, price, promotionalPrice);
    }

    // static fromObject(obj: any): Product {
    //   const { id, name, description, color, productCategory, price, promotionalPrice } = obj;
    //   return new Product(id, name, description, color, productCategory, price, promotionalPrice);
    // }

    // toObject(): any {
    //   return {
    //     id: this.id,
    //     name: this.name,
    //     description: this.description,
    //     color: this.color,
    //     productCategory: this.productCategory,
    //     price: this.price,
    //     promotionalPrice: this.promotionalPrice,
    //   };
    // }
}