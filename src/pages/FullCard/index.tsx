import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useParams } from "react-router-dom";
import { useGetItemQuery } from "../../api/apiSlice";
import { Carousel } from "react-responsive-carousel";
import { IShopItem } from "../../redux/filters/type";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./slider.scss";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { addToCart } from "../../redux/cart/slice";
import { findedCartItem } from "../../redux/cart/slice";
import { ICartItem } from "../../redux/cart/type";


const FullCard:React.FC = () => {
  const { id } = useParams();
  const { data: item, isError, isLoading } = useGetItemQuery(Number(id));
  const items = [...Array(5).fill(item)];
  const itemAddedToCart = useAppSelector(findedCartItem(item?.id!));
  const dispatch = useAppDispatch();

  const onAddCartItem = () => {
    if (item) {
      const cartItem: ICartItem = {
        id: item.id,
        image: item.image,
        title: item.title,
        price_usd: item.price_usd,
        description: item.description,
        created_by: item.created_by,
        count: 1,
      };
      dispatch(addToCart(cartItem));
    }
  };

  if (isError) {
    return (
      <div>Oh no, there was an error</div>
    )
  }

  const renderThumb = (items: IShopItem[]) => {
    return items.map((item, index) => (
      <div key={index}>
        <img src={item?.image} alt={item?.title} />
      </div>
    ));
  };

  return (
    <>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      ) : (
        <div className="root-full-card">
          <Card
            sx={{
              width: "50%",
              backgroundColor: "inherit",
              marginTop: "20px",
              boxShadow: "none",
            }}>
            <CardContent>
              <Typography
                color={"#9c27b0"}
                gutterBottom
                variant="h4"
                component="div">
                {item?.title}
              </Typography>
              <Typography
                sx={{
                  color: "#888484",
                  maxWidth: 480,
                  margin: "30px auto ",
                }}
                gutterBottom
                variant="h5"
                component="div">
                {item?.description}
              </Typography>
              <Typography variant="button">
                price: {item?.price_usd}$
              </Typography>
              <Badge color="secondary" badgeContent={itemAddedToCart?.count}>
                <IconButton onClick={onAddCartItem}>
                  <TaskAltIcon />
                </IconButton>
              </Badge>
            </CardContent>
          </Card>
          <Card
            sx={{
              maxWidth: "50%",
              marginTop: "20px",
              backgroundColor: "inherit",
              boxShadow: "none",
            }}>
            <Carousel
              showStatus
              showIndicators={false}
              showArrows={false}
              swipeable
              autoPlay
              interval={5000}
              infiniteLoop={true}
              centerMode
              centerSlidePercentage={100}
              renderThumbs={() => renderThumb(items)}>
              {items.map((item, i) => (
                <CardMedia
                  sx={{ border: "none" }}
                  key={i}
                  component="img"
                  height="600"
                  image={item?.image}
                  alt={item?.title}
                />
              ))}
            </Carousel>
          </Card>
        </div>
      )}
    </>
  );
};

export default FullCard;
