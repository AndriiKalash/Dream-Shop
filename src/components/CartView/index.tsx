import List from "@mui/material/List";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/cart/slice";
import { CartCard } from "../CartCard";


export const CartView: React.FC = () => {

  const {items} = useSelector(cartSelector);

  return (
    <List>
      {
        items.map(item => (
          <CartCard  {...item} key={item.id}/>
        ))
      }
    </List>
  );
};
