import React, { useState, useEffect, useRef } from "react";
import { awrapper } from "../../dummydata";
import "./Awrapper.css"; // Assuming you have a CSS file for styling
import CountUp from "react-countup"; // Import CountUp from react-countup

const Awrapper = () => {
  const [animatedIndexes, setAnimatedIndexes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const awrapperRef = useRef(null);

  // Function to generate random indexes for animated numbers
  const generateRandomIndexes = () => {
    const randomIndexes = [];
    for (let i = 0; i < awrapper.length; i++) {
      randomIndexes.push(i); // Push indexes from 0 to length of awrapper
    }
    setAnimatedIndexes(randomIndexes);
  };

  useEffect(() => {
    generateRandomIndexes();
  }, []); // Run once on component mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null, // viewport
        threshold: 0.5, // 50% of the element visible
      }
    );

    if (awrapperRef.current) {
      observer.observe(awrapperRef.current);
    }

    return () => {
      if (awrapperRef.current) {
        observer.unobserve(awrapperRef.current);
      }
    };
  }, []);

  return (
    <section className="awrapper" ref={awrapperRef}>
      <div className="container grid">
        {awrapper.map((val, index) => (
          <div key={index} className="box flex">
            <div className="img">
              <img src={val.cover} alt="" />
            </div>
            <div className="text">
              {isVisible ? (
                <h1>
                  <CountUp start={0} end={parseInt(val.data.replace(",", ""))} duration={2} separator="," />
                  {/* Increase duration to 2 seconds */}
                </h1>
              ) : (
                <h1>0</h1> // Initial state before it's visible
              )}
              <h3>{val.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awrapper;
