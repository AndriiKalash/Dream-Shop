import { Divider, IconButton, List, TextField } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { DrawerCard } from "../DrawerCard";
import { useSelector } from "react-redux";
import { shopItemsSelector } from "../../redux/shopItems/slice";
import { useAppDispatch } from "../../hooks";
import { IShopItem } from "../../redux/shopItems/type";
import { useGetGoodsQuery } from "../../api/apiSlice";
import useDebounce from "../../hooks/useDebounce";

interface SearchViewProps {
  onClose: (value: boolean) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const delaySearch = useDebounce(searchValue, 1000);
  const searchValueBoolean = Boolean(delaySearch);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: items = [],
    isLoading,
    isFetching,
    isError,
    isSuccess
  } = useGetGoodsQuery(searchValueBoolean ? delaySearch : "", {
    skip: !searchValueBoolean,
  });

  const renderFilteredItems = (
    value: string,
    items: IShopItem[]
  ): React.ReactNode | null => {
    if (!value) {
      return null;
    }
    if (isLoading || isFetching) {
      return <div>Loading...</div>;//sleleton
    }
    if (isSuccess && items.length === 0) {
      return <div>No one goods by your request</div>;//icon sad
    }
    if (isError) {
      return <div>Error occurred while fetching goods</div>;// icon error
    }
    return items.map((item) => <DrawerCard {...item} key={item.id} />);
  };

  const clearInput = () => setSearchValue("");


  return (
    <List>
      <li className={styles.chapter}>
        <div className={styles.inputField}>
          <TextField
            id="search"
            label="search"
            variant="standard"
            color="secondary"
            value={searchValue}
            ref={inputRef}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <IconButton className={styles.clearInput} onClick={clearInput}>
              <ClearIcon color="secondary" />
            </IconButton>
          )}
        </div>
        <IconButton onClick={() => onClose(false)}>
          <HighlightOffIcon />
        </IconButton>
      </li>
      <Divider />
      {renderFilteredItems(searchValue, items)}
    </List>
  );
};
