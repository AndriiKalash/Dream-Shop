export enum StatusCart {
  LOADING = "loading",
  IDLE = "idle",
  ERROR = "error",
}

export interface ICartItem {
  image: string;
  title: string;
  price_usd: number;
  description: string;
  created_by: string;
}
export interface ICartItems {
  items: ICartItem[];
  status: StatusCart;
}
