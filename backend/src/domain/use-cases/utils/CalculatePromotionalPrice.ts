import ProductCategory from '@/domain/models/ProductCategory';

export function CalculatePromotionalPrice(price: number, category: ProductCategory): number {
    const discountAmount = (price * category.discount) / 100;
    const promotionalPrice = price - discountAmount;

    return Number(promotionalPrice.toFixed(2));
}
