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
}
export interface IFilters {
  searchValue: string;
  searchMoreGoods: boolean;
  priceValue: number[];
}
