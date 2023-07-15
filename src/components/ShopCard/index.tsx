import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { IShopItem } from "../../redux/filters/type";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { addToCart, findedCartItem } from "../../redux/cart/slice";
import { ICartItem } from "../../redux/cart/type";

import styles from "./ShopCard.module.scss";
import { Link } from "react-router-dom";

interface ShopCardPropsType extends IShopItem {}

export const ShopCard: React.FC<ShopCardPropsType> = ({
  image,
  title,
  price_usd,
  id,
  description,
  created_by,
}) => {
  
  const itemAddedToCart = useAppSelector(findedCartItem(id));
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
      <Link to={`/shop/${id}`} >
        <CardActionArea>
            <CardMedia component="img" height="350" image={image} alt={title} />
        </CardActionArea>
      </Link>  
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div className={styles.cardBottom}>
            <Typography>price: {price_usd}$</Typography>
            <Badge color="secondary" badgeContent={itemAddedToCart?.count}>
              <IconButton onClick={onAddCartItem}>
                <TaskAltIcon />
              </IconButton>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
