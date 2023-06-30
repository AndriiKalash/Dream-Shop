import { IconButton, Link} from "@mui/material";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { cartSelector } from "../../redux/cart/slice";
import styles from "./Header.module.scss";

interface IHeaderProps {
  openCart: (value: boolean) => void;
  onActiveChildren:(value: string) => void;
}


export const Header: React.FC<IHeaderProps> = ({openCart, onActiveChildren}) => {

  
  const {totalCount} = useSelector(cartSelector)

  type LinkProps = {
    isActive: boolean;
    isPending: boolean;
  };

  const getLinkClassName = ({ isActive, isPending }: LinkProps): string =>
    isPending ? styles.link : isActive ? styles.activeLink : styles.link;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.navigation}>
          <NavLink className={getLinkClassName } to="/">
            Home
          </NavLink>
          <NavLink className={getLinkClassName} to="/shop">
            Shop
          </NavLink>
          <NavLink className={getLinkClassName} to="/about">
            About us
          </NavLink>
          <NavLink className={getLinkClassName} to="/contact">
            Contact
          </NavLink>
        </div>
        <div className={styles.navigation}>
          {true ? (
            <NavLink to="/login" className={getLinkClassName}>
              Login
            </NavLink>
          ) : (
            <Link href="#" underline="none">
              Logout
            </Link>
          )}
          <IconButton onClick={()=>{
            openCart(true);
            onActiveChildren('search')}}>
            <SearchOutlinedIcon />
          </IconButton>
          <div className={styles.cart} onClick={()=>{
            openCart(true);
            onActiveChildren('cart')}}>
            <IconButton aria-label="add to shopping cart">
              <LocalMallTwoToneIcon />
              {totalCount > 0 && (
                <span className={styles.cartCount}>
                  <p>{totalCount}</p>
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
