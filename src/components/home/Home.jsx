import React, { useLayoutEffect, useRef, useState } from "react";
import AboutCard from "../about/AboutCard";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
// import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
import CustomCarousel from "../allcourses/ImageSlider";
import { images } from "../../dummydata";

const Home = () => {
  const priceRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useLayoutEffect(() => {
    if (shouldScroll && priceRef.current) {
      priceRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false); // Prevent further scrolling after initial scroll
    }
  }, [shouldScroll]);

  return (
    <>
      <Hero />
      <CustomCarousel>
        {images.map((image, index) => (
          <img src={image.imgURL} alt={image.imgAlt} key={index} />
        ))}
      </CustomCarousel>

      <AboutCard />
      <HAbout />
      <Testimonal />
      {/* <Hprice ref={priceRef} /> */}
    </>
  );
};

export default Home;
