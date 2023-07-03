import { IconButton } from "@mui/material";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { cartSelector } from "../../redux/cart/slice";
import styles from "./Header.module.scss";
import {
  filterSelector,
  serachMore,
  setSearchValue,
} from "../../redux/filters/slice";
import { useAppDispatch } from "../../hooks/useApp";
import { useEffect, useRef } from "react";

interface IHeaderProps {
  openCart: (value: boolean) => void;
  onActiveChildren: (value: string) => void;
}

export const Header: React.FC<IHeaderProps> = ({
  openCart,
  onActiveChildren,
}) => {

  const { totalCount, items } = useSelector(cartSelector);
  const { searchMoreGoods } = useSelector(filterSelector);
  const dispatch = useAppDispatch();
  const onSearchClear = () => {
    dispatch(setSearchValue(""));
    dispatch(serachMore(false));
  };
  const isMounted = useRef(false);

  const getLinkClassName = ({
    isActive,
    isPending,
  }: Record<string, boolean>): string => (isActive ? styles.activeLink : "");

  useEffect(()=>{
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  },[items]);
  
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.navigation}>
          <NavLink className={getLinkClassName} to="/">
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
            <a href="#">Logout</a>
          )}
          {searchMoreGoods && (
            <Link to="/shop"  onClick={onSearchClear}>
              All goods
            </Link>
          )}
          <IconButton
            onClick={() => {
              openCart(true);
              onActiveChildren("search");
            }}>
            <SearchOutlinedIcon />
          </IconButton>
          <div
            className={styles.cart}
            onClick={() => {
              openCart(true);
              onActiveChildren("cart");
            }}>
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
