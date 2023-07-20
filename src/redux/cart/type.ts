export interface ICartItem {
  id: number;
  image: string;
  title: string;
  price_usd: number;
  description: string;
  created_by: string;
  count?: number;
}

export interface ICartItems {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}
