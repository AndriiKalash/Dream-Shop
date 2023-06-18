export enum StatusShopItems {
  LOADING = "loading",
  IDLE = "idle",
  ERROR = "error",
}

export interface IShopItem {
  image: string;
  title: string;
  price_usd: number;
  description: string;
  created_by: string;
}
export interface IShopItems {
  items: IShopItem[];
  status: StatusShopItems;
}
