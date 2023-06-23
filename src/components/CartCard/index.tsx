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
import { useAppDispatch } from "../../hooks";
import { ICartItem } from "../../redux/cart/type";

interface ICartItemProps extends ICartItem {}

export const CartCard: React.FC<ICartItemProps> = ({
  id,
  image,
  title,
  count,
  price_usd,
}) => {
  const dispatch = useAppDispatch();
  const onAddCartItem = () => {
    const cartItem = {
      id,
    } as ICartItem;
    dispatch(addToCart(cartItem));
  };

  return (
    <div>
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
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="div"
                variant="h6"
                color="text.primary">
                <IconButton
                disabled={count === 1}
                onClick={()=>dispatch(minusCartItem(id))}>
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
            primary={(price_usd*count).toFixed(2)}
            secondary={
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
    </div>
  );
};
