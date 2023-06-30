import List from "@mui/material/List";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { serachMore } from "../../redux/filters/slice";
import { cartSelector } from "../../redux/cart/slice";

import { DrawerCard } from "../DrawerCard";
import styles from "./CartView.module.scss";

interface CartViewProps {
  onClose: (value: boolean) => void;
}
export const CartView: React.FC<CartViewProps> = ({ onClose }) => {

  const { items } = useSelector(cartSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const oncloseCart = () => {
    onClose(false);
    navigate("/shop");
    dispatch(serachMore(false));
  };

  return (
    <List>
      <li className={styles.chapter}>
        <div style={{ paddingLeft: 15 }}>Cart</div>
        <IconButton onClick={() => onClose(false)}>
          <HighlightOffIcon />
        </IconButton>
      </li>
      <Divider />
      {items.length < 1 ? (
        <div style={{ textAlign: "center" }}>
          <h4 style={{ color: "#000" }}>
            You haven't added any items to your order yet
          </h4>
          <p>Click on the cart to return to shopping</p>
          <IconButton onClick={oncloseCart}>
            <AddShoppingCartIcon className={styles.cartIcon} />
          </IconButton>
        </div>
      ) : (
        items.map((item) => <DrawerCard {...item} key={item.id} cart />)
      )}
    </List>
  );
};
