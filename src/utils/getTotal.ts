import { ICartItem } from "../redux/cart/type";

export const getTotalCount = (items: ICartItem[]): number => {
  return items.reduce((sum, item) => sum + item.count!, 0);
};

export const getTotalPrice = (items: ICartItem[]): number => {
  return +items
    .reduce((sum, item) => sum + item.count! * item.price_usd, 0)
    .toFixed(2);
};
