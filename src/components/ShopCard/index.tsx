import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { IShopItem } from "../../redux/shopItems/type";
import styles from "./ShopCard.module.scss";
import { useAppDispatch } from "../../hooks";
import { addToCart, findedCartItem } from "../../redux/cart/slice";
import { ICartItem } from "../../redux/cart/type";
import { useSelector } from "react-redux";

interface ShopCardPropsType extends IShopItem {}

export const ShopCard: React.FC<ShopCardPropsType> = ({
  image,
  title,
  price_usd,
  id,
  description,
  created_by,
}) => {
  const itemAddedToCart = useSelector(findedCartItem(id));
  const dispatch = useAppDispatch();

  const onAddCartItem = () => {
    const cartItem: ICartItem = {
      image,
      title,
      price_usd,
      id,
      description,
      created_by,
      count: 1,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <Grid item xs={3} sm={4} md={4} className={styles.inner}>
      <Card sx={{ maxWidth: 300 }} className={styles.card}>
      <CardActionArea>
        <CardMedia component="img" height="350" image={image} alt={title} />
      </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div className={styles.cardBottom}>
            <Typography>price: {price_usd}$</Typography>
            <IconButton onClick={onAddCartItem}>
              <TaskAltIcon />
            </IconButton>
            {itemAddedToCart && (
              <Typography 
              className={styles.cartCount} 
              component="span" 
              color="#00f3f3">
                {itemAddedToCart.count}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
