import { Grid } from "@mui/material";
import { useEffect } from "react";
import { filterSelector } from "../../redux/filters/slice";
import { useGetGoodsQuery } from "../../api/apiSlice";
import { ShopCard } from "../ShopCard";
import { SkeletonCard } from "../ShopCard/SkeletonCard";
import styles from "./ShopItems.module.scss";
import { useAppSelector } from "../../hooks/useApp";
import useDebounce from "../../hooks/useDebounce";


export const ShopView: React.FC = () => {

  const { searchValue, searchMoreGoods, priceValue } =
    useAppSelector(filterSelector);
  const debounce = useDebounce(priceValue, 1500);
  const {
    data: items = [],
    refetch,
    isError,
    isLoading,
  } = useGetGoodsQuery({ search: searchMoreGoods ? searchValue : "" });

  useEffect(() => {
    if (searchMoreGoods) {
      refetch();
    }
  }, [searchMoreGoods, refetch]);

  return (
    <Grid
      className={styles.root}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 12, md: 16 }}>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        [...Array(8)].map((_, i) => (
            <SkeletonCard key={i}/>
        ))
      ) : (
        items
          .filter(
            (item) =>
              item.price_usd >= debounce[0] && item.price_usd <= debounce[1]
          )
          .map((item) => <ShopCard key={item.id} {...item} />)
      )}
    </Grid>
  );
};
