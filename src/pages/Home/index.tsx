import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Carousel = require("react-responsive-carousel").Carousel;

const Home = () => {
  interface SlidesState {
    id: number;
    image: string;
    title: string;
    text: string;
  }
  const [slides, setSlides] = useState<SlidesState[]>([]);

  const getSlider = async () => {
    try {
      const { data } = await axios.get("data.json");
      setSlides(data);
    } catch (error) {
      alert("could not fetch slide");
      throw new Error(error as string);
    }
  };
  useEffect(() => {
    getSlider();
  }, []);

  return (
    <Carousel
      showStatus={false}
      showArrows={true}
      showThumbs={false}
      swipeable={true}
      // autoPlay={true}
      interval={10000}
      infiniteLoop={true}>
      {slides.map((slide) => (
        <div key={slide.id} className={styles.sliderContainer}>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${slide.image})` }}>
            <p>{slide.title}</p>
            <h3>{slide.text}</h3>
            <Link to="/shop">
              <Button variant="contained">shop now</Button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Home;
