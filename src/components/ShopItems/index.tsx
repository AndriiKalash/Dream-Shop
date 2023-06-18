import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { IShopItem, StatusShopItems } from "../../redux/shopItems/type";
import { useSelector } from "react-redux";
import { fetchShopItems, shopItemsSelector } from "../../redux/shopItems/slice";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import styles from "./ShopItems.module.scss";

// interface IShopItemsPtops extends IShopItem {
//   status: StatusShopItems;
//   id: number;
// }

export const ShopItems: React.FC = () => {
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
      {(status === StatusShopItems.LOADING ? [...Array(9)] : items).map(
        (item, i) => (
          <Grid item xs={3} sm={4} md={4} key={i} className={styles.inner}>
            {status === StatusShopItems.LOADING ? (
              <Skeleton sx={{ maxWidth: 300 }}
                className={styles.card}
                variant="rounded"
                height={450}
              />
            ) : (
              <Card sx={{ maxWidth: 300 }} className={styles.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="350"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <div className={styles.cardBottom}>
                        <p>price: {item.price_usd}$</p>
                        <div>
                          <IconButton>
                            <TaskAltIcon />
                          </IconButton>
                          <span>1</span>
                        </div>
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};
