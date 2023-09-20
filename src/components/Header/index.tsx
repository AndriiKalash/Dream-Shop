import { Badge, Divider, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { NavLink, Link, useLocation } from 'react-router-dom';
import { cartSelector } from '../../redux/cart/slice';
import styles from './Header.module.scss';
import {
  filterSelector,
  serachMore,
  setSearchValue,
} from '../../redux/filters/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { useEffect, useRef } from 'react';
import { renderedDrawer } from '../../App';
import { Sort } from '../Sort/Sort';

interface IHeaderProps {
  openCart: (value: boolean) => void;
  onActiveChildren: (value: renderedDrawer) => void;
}

export const Header: React.FC<IHeaderProps> = ({
  openCart,
  onActiveChildren,
}) => {
  const { totalCount, items } = useAppSelector(cartSelector);
  const { searchMoreGoods } = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();
  const onSearchClear = () => {
    dispatch(setSearchValue(''));
    dispatch(serachMore(false));
  };
  const isMounted = useRef(false);
  const location = useLocation();

  const getLinkClassName = ({ isActive }: Record<string, boolean>): string =>
    isActive ? styles.activeLink : '';

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div>
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
            <Link to="/shop" onClick={onSearchClear}>
              All goods
            </Link>
          )}
          {location.pathname === '/shop' && <Sort />}
          <IconButton
            onClick={() => {
              openCart(true);
              onActiveChildren(renderedDrawer.SEARCH);
            }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              openCart(true);
              onActiveChildren(renderedDrawer.CART);
            }}>
            <Badge color="secondary" badgeContent={totalCount}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>
      <Divider />
    </div>
  );
};
