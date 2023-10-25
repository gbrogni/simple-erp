import crypto from 'crypto';

export default class Product {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly color: string,
        readonly productCategory: string,
        readonly price: number,
        readonly promotionalPrice: number,
    ) {}

    static create(
        name: string,
        description: string,
        color: string,
        productCategory: string,
        price: number,
        promotionalPrice: number,
    ): Product {

        const id = crypto.randomUUID();
        return new Product(id, name, description, color, productCategory, price, promotionalPrice);
    }
}
