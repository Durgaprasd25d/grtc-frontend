import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Images/logo/logo.png";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <Link to="/">
            <div
              className="logo"
              style={{
                height: "168px",
                color: "rgb(255, 255, 255)",
                marginTop: "-50px",
                display: "flex",
                alignItems: "center",
                width: "150px",
              }}
            >
              <div>
                <h1> GURUKRUPA</h1>
                <span>RESEARCH AND TRAINING CENTRE</span>
              </div>
              <div className="logos-row">
                <img src={Logo} alt="Logo 1" className="logo-img" />
                <img src={Logo} alt="Logo 2" className="logo-img" />
                <img src={Logo} alt="Logo 3" className="logo-img" />
              </div>
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
