import React, { useRef, useEffect } from "react";
import "./courses.css";
import { coursesCard } from "../../dummydata";
import defaultCourseImage from "../../Images/defaultCourse.webp"
import defaultTeacherImage from "../../Images/defaultUser.jpeg"


const CoursesCard = () => {
  const mainContentRef = useRef(null);

  useEffect(() => {
    mainContentRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Function to handle broken image URLs
  const handleImageError = (event, defaultSrc) => {
    event.target.src = defaultSrc;
  };

  return (
    <>
      <section className="coursesCard" ref={mainContentRef}>
        <div className="container">
          {coursesCard.map((val) => (
            <div className="items" key={val.id}>
              <div className="img">
                <img 
                  src={val.cover || defaultCourseImage} 
                  alt={val.coursesName} 
                  onError={(e) => handleImageError(e, defaultCourseImage)}
                />
              </div>
              <div className="text">
                <h1>{val.coursesName}</h1>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <label htmlFor="">(5.0)</label>
                </div>
                <div className="details">
                  {val.courTeacher.map((details, index) => (
                    <div className="box" key={index}>
                      <div className="dimg">
                        <img 
                          src={details.dcover || defaultTeacherImage} 
                          alt={details.name} 
                          onError={(e) => handleImageError(e, defaultTeacherImage)}
                        />
                      </div>
                      <div className="para">
                        <h4>{details.name}</h4>
                      </div>
                      <span>{details.totalTime}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="price">
                <h3>
                  {val.priceAll}
                </h3>
              </div>
              <button className="outline-btn">ENROLL NOW!</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
