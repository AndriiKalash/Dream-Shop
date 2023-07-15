import {Grid, Skeleton} from "@mui/material";
import styles from "./ShopCard.module.scss"


export const SkeletonCard: React.FC = () => {

    return (
        <Grid 
          item xs={3} sm={4} md={4}>
              <Skeleton sx={{maxWidth:300}}
                className={styles.card}
                variant="rounded"
                height={450}
              />
        </Grid>
    )
}