import React, { useState, useEffect, useCallback } from "react";
import "./custom.slider.css";

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  const slideNext = useCallback(() => {
    setActiveIndex((val) => (val >= children.length - 1 ? 0 : val + 1));
  }, [children.length]);

  const slidePrev = useCallback(() => {
    setActiveIndex((val) => (val <= 0 ? children.length - 1 : val - 1));
  }, [children.length]);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone, slideNext]);

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div className="carousel-container">
      <div
        className="container__slider"
        onMouseEnter={AutoPlayStop}
        onMouseLeave={AutoPlayStart}
      >
        {children.map((item, index) => (
          <div
            className={`slider__item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            {item}
          </div>
        ))}

        <div className="container__slider__links">
          {children.map((_, index) => (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          ))}
        </div>

        <button
          className="slider__btn-next"
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          {">"}
        </button>
        <button
          className="slider__btn-prev"
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          {"<"}
        </button>
      </div>
    </div>
  );
}

export default CustomCarousel;
