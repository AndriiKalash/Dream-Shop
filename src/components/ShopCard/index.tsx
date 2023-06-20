import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { IShopItem } from "../../redux/shopItems/type";
import styles from "./ShopCard.module.scss";

interface ShopCardPropsType extends IShopItem {}

export const ShopCard: React.FC<ShopCardPropsType> = ({
  image,
  title,
  price_usd,
  id,
}) => {

  

  return (
    <Grid item xs={3} sm={4} md={4} className={styles.inner}>
      <Card sx={{ maxWidth: 300 }} className={styles.card}>
        <CardActionArea>
          <CardMedia
          component="img"
          height="350"
          image={image} 
          alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div className={styles.cardBottom}>
                <p>price: {price_usd}$</p>
                <div>
                  <IconButton>
                    <TaskAltIcon />
                  </IconButton>
                  <span>1</span>
                </div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
