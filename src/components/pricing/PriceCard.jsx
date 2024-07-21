import React, { useEffect, useRef } from "react";
import { price } from "../../dummydata";

const PriceCard = () => {
  const firstPriceCardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      firstPriceCardRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // Wait for CSS transitions to complete before scrolling
    setTimeout(handleScroll, 300); // Adjust timing as per your CSS transition duration
  }, []);

  return (
    <>
      {price.map((val, index) => (
        <div key={index} className="items shadow" ref={index === 0 ? firstPriceCardRef : null}>
          <h4>{val.name}</h4>
          <h1>
            <span>$</span>
            {val.price}
          </h1>
          <p>{val.desc}</p>
          <button className="outline-btn">GET STARTED</button>
        </div>
      ))}
    </>
  );
};

export default PriceCard;
