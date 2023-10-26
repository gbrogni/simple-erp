import Product from "../models/Product";

export function calculatePromotionalPrice(product: Product): number {
    const { price, productCategory } = product;
    let discountPercentage = 0;

    switch (productCategory) {
        case 'Smartphones':
            discountPercentage = 2.55;
            break;
        case 'Furniture':
            discountPercentage = 3;
            break;
        case 'Electronics':
            discountPercentage = 4.3;
            break;
        case 'Appliances':
            discountPercentage = 5;
            break;
        case 'Refrigerators':
            discountPercentage = 7.5;
            break;
        default:
            discountPercentage = 0;
            break;
    }

    const discountAmount = (price * discountPercentage) / 100;
    const promotionalPrice = price - discountAmount;

    return Number(promotionalPrice.toFixed(2));
}