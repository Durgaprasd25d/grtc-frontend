import React from "react";
import { Link } from "react-router-dom";
import Logo_1 from "../../../Images/logo/gurukrupa.png";
import Logo_2 from "../../../Images/logo/msme-ssi-registration.png";
import Logo_3 from "../../../Images/logo/Logo ISO_9001.png";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <Link to="/">
            <div
              style={{
                color: "#fff",
                marginTop: "10px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
              className="logo-text"
            >
              <h1
                style={{
                  fontSize: "80px",
                  fontWeight: "900",
                  fontFamily: "initial",
                }}
              >
                GURUKRUPA
              </h1>
              <span style={{ fontSize: "20px" }}>
                RESEARCH AND TRAINING CENTRE
              </span>
            </div>
          </Link>
          <div className="logos-row">
            <img src={Logo_1} alt="Logo 1" className="logo-img" />
            <img src={Logo_2} style={{width:'120px',height:'120px'}} alt="Logo 2" className="logo-img" />
            <img src={Logo_3}  alt="Logo 3" className="logo-img" />
          </div>
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
