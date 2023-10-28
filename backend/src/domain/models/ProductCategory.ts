export default class ProductCategory {

    id: string;
    name: string;
    discount: number;

    constructor(id: string, name: string, discount: number) {
        this.id = id;
        this.name = name;
        this.discount = discount;
    }

}