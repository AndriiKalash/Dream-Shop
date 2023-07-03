import { ICartItem } from "../redux/cart/type";
import { getTotalCount, getTotalPrice } from "./getTotal";

export const getItemsFromLS = () => {
  const data = localStorage.getItem("cart");
  const items: ICartItem[] = data ? JSON.parse(data) : [];
  const totalCount = getTotalCount(items);
  const totalPrice = getTotalPrice(items);
  return {
    items,
    totalCount,
    totalPrice,
  };
};
