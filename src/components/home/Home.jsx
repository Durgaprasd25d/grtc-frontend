import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
import CustomCarousel from "../allcourses/ImageSlider";
import { images } from "../../dummydata";
const Home = () => {
  return (
    <>
      <Hero />
      <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>
      <AboutCard />
      <HAbout />

      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  );
};

export default Home;
