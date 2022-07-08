import React from "react";
import "../htmlDeigne/css/bootstrap.min.css";
import "../htmlDeigne/css/swiper.css";
import "../htmlDeigne/css/style.css";

import couple from "../htmlDeigne/images/couple.svg";
import ios from "../htmlDeigne/images/ios.png";
import android from "../htmlDeigne/images/android.png";

import { useNavigate } from "react-router";
import Header from "./../components/headers/Header";
import Footer from "../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage window_heaight">
      <div className="container">
        <Header />
        <div className="home_banner_content">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="banner_img">
                <img src={couple} alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-7">
              <div className="banner_text">
                <h1>
                  Where <br />
                  <strong>Muslims</strong> complete <br />
                  their <strong>religion</strong>
                </h1>
                <div className="download">
                  <h3>Download now</h3>
                  <a
                    target={"_blank"}
                    href="https://play.google.com/store/apps/details?id=com.anadeemus.getnikahfied"
                  >
                    <img src={android} alt="" />
                  </a>
                  <a href="#">
                    <img src={ios} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
