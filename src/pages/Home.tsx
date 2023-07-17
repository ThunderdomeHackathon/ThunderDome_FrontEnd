import "../styles/Home.css";

import { Link, useNavigate } from "react-router-dom";
import React from "react";
import HeroSection from "../components/HeroSection";

function Home() {

  const navigate = useNavigate();
  const AboutUsClick = () => {
    navigate("/about-us");
  }

  return (
    <div>
      <HeroSection />
      <div className="home" style={{ backgroundColor: "black" }}>
        <div className="headerContainer">

          <div className="subheaderContainer" onClick={AboutUsClick}>
            <h1>ThunderDome Voting System</h1>
          </div>

          <Link to="/voter-login">
            <button>Vote</button>
          </Link>
          <Link to="/organization-login">
            <button>Create an Election</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
