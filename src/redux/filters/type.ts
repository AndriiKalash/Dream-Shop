export enum StatusShop {
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
  id: number;
}
export interface IShopItems {
  items: IShopItem[];
  status: StatusShop;
}
export interface IFilters {
  searchValue: string;
  searchAllGoods: boolean;
}
