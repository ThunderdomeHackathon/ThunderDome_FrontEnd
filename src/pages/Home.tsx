import "../styles/Home.css";

import { Link } from "react-router-dom";
import React from "react";
import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="home" style={{ backgroundColor: "black" }}>
        <div className="headerContainer">
        <div className="subheaderContainer">
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
