import { Grid } from "@mui/material";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { filterSelector } from "../../redux/filters/slice";
import { useGetGoodsQuery } from "../../api/apiSlice";

import { ShopCard } from "../ShopCard";
import { SkeletonCard } from "../ShopCard/SkeletonCard";
import styles from "./ShopItems.module.scss";

export const ShopView: React.FC = () => {

  const { searchValue, searchAllGoods } = useSelector(filterSelector);

  const {
    data: items = [],
    refetch,
    isError,
    isLoading,
  } = useGetGoodsQuery( searchAllGoods ? searchValue : "" );

  useEffect (() => {
    if (searchAllGoods) {
      refetch();
    }
  },[searchAllGoods,refetch]);

  
  return (
    <Grid
      className={styles.root}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 12, md: 16 }}>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
      ) : (
        items.map((item) => <ShopCard key={item.id} {...item} />)
      )}
    </Grid>
  );
};
