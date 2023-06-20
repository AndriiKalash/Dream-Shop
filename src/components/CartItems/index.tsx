import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from "./CartItems.module.scss";

export const CartItems: FC = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemAvatar>
            <Avatar 
            style={{ width: 80, height: 80, marginRight:15 }} 
            alt="cart-item" 
            src="image/candle-decoration.jpeg" />
          </ListItemAvatar>
          <ListItemText
            style={{textAlign: "center"}}
            primary="Relaxing lavender"
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="div"
                variant="h6"
                color="text.primary">
                <IconButton>
                  <RemoveCircleOutlineIcon/>
                </IconButton>
                <span>{3}</span>
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Typography>
            }
          />
           <ListItemText
            style={{textAlign: "center"}}
            primary="18.99"
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="div"
                variant="h6"
                color="text.primary">
                <IconButton>
                  <DeleteOutlineIcon />
                </IconButton>
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  );
};
