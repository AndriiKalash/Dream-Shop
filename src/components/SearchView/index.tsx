import { Button, Divider, IconButton, LinearProgress, List, TextField, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClearIcon from "@mui/icons-material/Clear";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Link } from "react-router-dom";
import { useGetGoodsQuery } from "../../api/apiSlice";
import {
  filterSelector,
  serachMore,
  setSearchValue,
} from "../../redux/filters/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import useDebounce from "../../hooks/useDebounce";

import { DrawerCard } from "../DrawerCard";
import { IShopItem } from "../../redux/filters/type";
import { Spinner } from "../Spinner";
import styles from "./Search.module.scss";
import React, { useEffect, useRef } from "react";

interface SearchViewProps {
  onClose: (value: boolean) => void;
}


export const SearchView: React.FC<SearchViewProps> = React.memo(
  ({ onClose }) => {
    const { searchValue } = useAppSelector(filterSelector);
    const dispatch = useAppDispatch();
    const delaySearch = useDebounce(searchValue, 1000);
    const searchValueBoolean = Boolean(delaySearch);
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(()=>{
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },[]);
  
    const {
      data: items = [],
      isLoading,
      isFetching,
      isError,
      isSuccess,
    } = useGetGoodsQuery(
      {search: searchValueBoolean ? delaySearch : ""}, {
      skip: !searchValueBoolean,
    });
  
    const onSearchMoreGoods = () => {
      dispatch(serachMore(true));
      onClose(false);
    };
  
    const onSearchClear = () => {
      dispatch(setSearchValue(""));
      dispatch(serachMore(false));
    };
  
    const renderFilteredItems = (
      value: string,
      items: IShopItem[]
    ): React.ReactNode | null => {
      if (!value) {
        return (
          <div className={styles.innerStatus}>
            <div className={styles.statusQuery}>
              enter what you are looking for
            </div>
            <ErrorOutlineIcon className={styles.statusQueryIcon} />
          </div>
        );
      }
      if (isLoading || isFetching) {
        return (
          <div className={styles.innerStatus}>
            <div className={styles.statusQuery}>loading...</div>
            <Spinner />
          </div>
        );
      }
      if (isSuccess && items.length === 0) {
        return (
          <div className={styles.innerStatus}>
            <div className={styles.statusQuery}>no one goods by your request</div>
            <SentimentVeryDissatisfiedIcon className={styles.statusQueryIcon} />
          </div>
        );
      }
      if (isError) {
        return (
          <div className={styles.innerStatus}>
            <div className={styles.statusQuery}>
              error occurred while fetching goods
            </div>
            <ErrorOutlineIcon className={styles.statusQueryIcon} />
          </div>
        );
      }
      return items.map((item) => <DrawerCard {...item} key={item.id} />);
    };
  
    return (
      <>
        <List>
          <li className={styles.chapter}>
            <div className={styles.inputField}>
              <TextField
                inputRef={inputRef}
                id="search"
                label="search"
                variant="standard"
                color="secondary"
                value={searchValue}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
              {searchValue && (
                <IconButton className={styles.clearInput} onClick={onSearchClear}>
                  <ClearIcon
                    color="secondary"
                    className={styles.clearInputIcon}
                  />
                </IconButton>
              )}
            </div>
            <IconButton onClick={() => onClose(false)}>
              <HighlightOffIcon />
            </IconButton>
          </li>
          {
            isLoading || isFetching ? 
            <LinearProgress color="secondary" /> :
            <Divider />
          }
          {renderFilteredItems(searchValue, items)}
          {items.length > 0 && searchValue && (
            <Link className={styles.buttonMoreLink}  to="/shop">
              <Button
                className={styles.buttonMore}
                variant="contained"
                onClick={onSearchMoreGoods}>
                more goods
              </Button>
            </Link>
          )}
        </List>
      </>
    );
  }
);
