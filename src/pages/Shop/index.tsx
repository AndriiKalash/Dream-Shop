import { ShopItems } from "../../components/ShopItems";
import style from "./Shop.module.scss";

const Shop = () => {

  return (
    <div className={style.root}>
        <ShopItems/>
    </div>
  );
};

export default Shop;


