import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Spinner } from "../../components/Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Home.module.scss";

const Carousel = require("react-responsive-carousel").Carousel;


const Home:React.FC = () => {

  enum  StatusSlide{
    LOADING = "loading",
    IDLE = "idle",
    ERROR = "error",
  }

  interface SlidesState {
    id: number;
    image: string;
    title: string;
    text: string;
  }

  const [slides, setSlides] = useState<SlidesState[]>([]);
  const [slidesStatus, setSlidesStatus] = useState<StatusSlide>(
    StatusSlide.LOADING
  );

  const getSlider = async () => {
    try {
      setSlidesStatus(StatusSlide.LOADING);
      const { data } = await axios.get("data.json");
      setSlides(data);
    } catch (error) {
      setSlidesStatus(StatusSlide.ERROR);
      alert("could not fetch slide");
      throw new Error(error as string);
    } finally {
      setSlidesStatus(StatusSlide.IDLE);
    }
  };
  useEffect(() => {
    getSlider();
  }, []);

  return (
    <>
      {slidesStatus === StatusSlide.LOADING ? 
      (
        <div className={styles.sliderContainer}>
          <Spinner />
        </div>
      ) : (
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          swipeable={true}
          autoPlay={true}
          interval={10000}
          infiniteLoop={true}>
          {slides.map((slide) => (
            <div 
            className={styles.sliderContainer}
            key={slide.id}>
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
      )}
    </>
  );
};

export default Home;
