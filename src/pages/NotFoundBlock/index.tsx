import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";
import { Button } from "@mui/material";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing founded :(</h1>
      <Link to="/" className={styles.buttonLink}>
        <Button variant="contained" className={styles.button}>
          <span>home page</span>
        </Button>
      </Link>
    </div>
  );
};


export default NotFoundBlock;
