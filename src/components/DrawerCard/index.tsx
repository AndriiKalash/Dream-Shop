import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { addToCart, deleteCartItem, minusCartItem } from "../../redux/cart/slice";

import { useAppDispatch } from "../../hooks/useApp";
import { ICartItem } from "../../redux/cart/type";

interface ICartItemProps extends ICartItem {
  cart?:boolean;
}


export const DrawerCard: React.FC<ICartItemProps> = ({
  id,
  image,
  title,
  count,
  price_usd,
  cart,
}) => {
  
  const dispatch = useAppDispatch();

  const onAddCartItem = () => {
    const cartItem = {
      id,
    } as ICartItem;
    dispatch(addToCart(cartItem));
  };

  const onMinusCartItem = () => dispatch(minusCartItem(id));

  const price = Number((count? price_usd*count : price_usd).toFixed(2));


  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              style={{ width: 80, height: 80, marginRight: 15 }}
              alt="cart-item"
              src={image}
            />
          </ListItemAvatar>
          <ListItemText
            style={{ textAlign: "left" }}
            primary={title}
            secondary={cart &&
              <Typography
                sx={{ display: "inline" }}
                component="div"
                variant="h6">
                <IconButton
                disabled={count === 1}
                onClick={onMinusCartItem}>
                  <RemoveCircleOutlineIcon/>
                </IconButton>
                <span>{count}</span>
                <IconButton onClick={onAddCartItem}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Typography>
            }
          />
          <ListItemText
            style={{ textAlign: "end" }}
            primary={price}
            secondary={ cart &&
              <Typography
                sx={{ display: "inline" }}
                component="div"
                variant="h6"
                color="text.primary">
                <IconButton onClick={()=>dispatch(deleteCartItem(id))}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};
