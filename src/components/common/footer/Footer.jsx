import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>GRTC - Stay tuned and get the latest updates</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className="right row">
            <input type="text" placeholder="Enter email address" />
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>GRTC</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>
              Wisdom is the right use of knowledge. To know is not to be wise.
              Many men know a great deal, and are all the greater fools for it.
              There is no fool so great a fool as a knowing fool. But to know
              how to use knowledge is to have wisdom.
            </p>
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-instagram icon"></i>
          </div>
          <div className="box link">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/verification">Verification</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/exam-list">Exam</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/notice">Notice</Link></li>
              <li><Link to="/image-gallery">Gallery</Link></li>
            </ul>
          </div>
          <div className="box last">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                Benagaon, Kanas, Puri, 752017
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +91-9662895519
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                info@gurukuledu.in
              </li>
              <li>
                Office Hour: Monday - Saturday 07:00AM to 07:00PM, Sunday Closed
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>
          Copyright © 2021 GRTC. All Rights Reserved | Powered by GRTC Institute
        </p>
      </div>
    </>
  );
};

export default Footer;
