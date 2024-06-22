import React, { useState, useEffect } from "react";
import { awrapper } from "../../dummydata";
import "./Awrapper.css"; // Assuming you have a CSS file for styling

const Awrapper = () => {
  const [animatedIndexes, setAnimatedIndexes] = useState([]);

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

  return (
    <section className='awrapper'>
      <div className='container grid'>
        {awrapper.map((val, index) => (
          <div key={index} className='box flex'>
            <div className='img'>
              <img src={val.cover} alt='' />
            </div>
            <div className='text'>
              <h1>
                <CountUp end={parseInt(val.data.replace(",", ""))} duration={0.5} />
              </h1>
              <h3>{val.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awrapper;

// Assuming you have a separate CountUp component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endNumber = parseInt(end);
    const durationTime = duration * 1000; // Convert seconds to milliseconds
    const stepTime = Math.abs(Math.floor(durationTime / (endNumber - start)));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endNumber) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};
