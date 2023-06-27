import { Grid } from "@mui/material";
import { IShopItem, StatusShop } from "../../redux/shopItems/type";
import { useSelector } from "react-redux";
import { fetchShopItems, shopItemsSelector } from "../../redux/shopItems/slice";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import { ShopCard } from "../ShopCard";
import { SkeletonCard } from "../ShopCard/SkeletonCard";
import { useGetGoodsQuery } from "../../api/apiSlice";
import styles from "./ShopItems.module.scss";

export const ShopView: React.FC = () => {
  // const { items, status } = useSelector(shopItemsSelector);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchShopItems(""));
  // }, []);

  interface GoodsData {
    data: IShopItem[];
    isFetching: boolean;
    isLoading: boolean;
  }
  const {
    data: items = [],
    error,
    isLoading,
  } = useGetGoodsQuery("");

  return (
    <Grid
      className={styles.root}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 12, md: 16 }}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
      ) : (
        items.map((item) => <ShopCard key={item.id} {...item} />)
      )}
    </Grid>
  );
};
