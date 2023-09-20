import { Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { filterSelector } from '../../redux/filters/slice';
import { useGetGoodsQuery } from '../../api/apiSlice';
import { ShopCard } from '../ShopCard';
import { SkeletonCard } from '../ShopCard/SkeletonCard';
import styles from './ShopItems.module.scss';
import { useAppSelector } from '../../hooks/useApp';
import useDebounce from '../../hooks/useDebounce';

export const ShopView: React.FC = () => {
  const { searchValue, searchMoreGoods, priceValue } =
    useAppSelector(filterSelector);
  const [pageCurrent, setPageCurrent] = useState(1);
  const debounce = useDebounce(priceValue, 1500);
  const {
    data: items = [],
    refetch,
    isError,
    isLoading,
  } = useGetGoodsQuery(
    {
      search: searchMoreGoods ? searchValue : '',
      page: pageCurrent,
    },
    { refetchOnFocus: true }
  );

  useEffect(() => {
    if (searchMoreGoods) {
      refetch();
      setPageCurrent(1);
    }
  }, [searchMoreGoods, refetch]);

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) =>
    setPageCurrent(page);

  return (
    <>
      <Grid
        className={styles.root}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 16 }}>
        {isError ? (
          <div>Oh no, there was an error</div>
        ) : isLoading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          items
            .filter(
              (item) =>
                item.price_usd >= debounce[0] && item.price_usd <= debounce[1]
            )
            .map((item) => <ShopCard key={item.id} {...item} />)
        )}
      </Grid>
      <Pagination
        count={3}
        color="secondary"
        defaultPage={pageCurrent}
        onChange={handlePage}
        sx={{ marginTop: 'auto' }}
      />
    </>
  );
};
