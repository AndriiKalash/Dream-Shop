import { IconButton, Link, TextField } from "@mui/material";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/cart/slice";

interface IHeaderProps {
  openCart: (value: boolean) => void;
}

export const Header: React.FC<IHeaderProps> = ({openCart}) => {

  const [openSerch, setOpenSearch] = useState(false);
  const {totalCount} = useSelector(cartSelector)

  type LinkProps = {
    isActive: boolean;
    isPending: boolean;
  };

  const getLinkClassName = ({ isActive, isPending }: LinkProps): string =>
    isPending ? "" : isActive ? styles.activeLink : "";

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
        {openSerch &&   
          <TextField
            style={{ height: 68 }}
            id="search"
            label="search"
            variant="standard"
          />
        }
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
          <IconButton onClick={() => setOpenSearch(true)}>
            <SearchOutlinedIcon />
          </IconButton>
          <div className={styles.cart} onClick={()=>openCart(true)}>
            <IconButton aria-label="add to shopping cart">
              <LocalMallTwoToneIcon />
              {totalCount>0 && (
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
