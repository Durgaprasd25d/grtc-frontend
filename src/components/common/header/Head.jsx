import React from "react";
import { Link } from "react-router-dom";
const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <Link to="/">
            <div className="logo" style={{color:'#ffff'}}>
              <h1> GURUKRUPA</h1>
              <span>RESEARCH AND TRAINING CENTRE</span>
            </div>
          </Link>

          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
