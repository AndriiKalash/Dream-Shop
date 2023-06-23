import { Grid } from "@mui/material";
import { StatusShop } from "../../redux/shopItems/type";
import { useSelector } from "react-redux";
import { fetchShopItems, shopItemsSelector } from "../../redux/shopItems/slice";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import { ShopCard } from "../ShopCard";
import { SkeletonCard } from "../ShopCard/SkeletonCard";
import styles from "./ShopItems.module.scss";

export const ShopView: React.FC = () => {
  const { items, status } = useSelector(shopItemsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShopItems());
  }, []);

  return (
    <Grid
      className={styles.root}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 12, md: 16 }}>
      {status === StatusShop.LOADING
        ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        : items.map((item) => <ShopCard key={item.id} {...item} />)}
    </Grid>
  );
};
