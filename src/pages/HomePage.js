import React, { useEffect, useState } from "react";
import particleConfig from "../assets/particles.json";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const titles = ["   Finance Professional", "   Tech Enthusiast", "   Gamer"];

  useEffect(() => {
    // Initialize particles effect only if on the home page
    if (window.location.pathname === "/") {
      /* eslint-disable no-undef */
      particlesJS("particles-js", particleConfig); // Use your particleConfig here
      /* eslint-enable no-undef */
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="home-page">
      <div id="particles-js">
        <div className="intro">
          <div className="home-page-header">
            <h1>Hi, I'm Sahil Bhatt 👋 </h1>
            <Typewriter
              options={{
                strings: titles,
                autoStart: true,
                cursor: "|",
                loop: true,
                wrapperClassName: "typewriter-wrapper",
              }}
            />
          </div>
          <p className="intro-text">
            Welcome to my world! I'm Sahil Bhatt, an enthusiast with a penchant
            for all things tech. While my journey started in the realm of
            commerce, my fascination with technology has been an unwavering
            force, propelling me to explore its boundless possibilities. As a
            numbers enthusiast by profession, I've mastered the art of managing
            financial landscapes. But beyond the spreadsheets and balance
            sheets, I'm driven by a curiosity to unravel the intricate tapestry
            of the digital world. Join me as I bridge the gap between finance
            and technology, unraveling insights and discoveries that merge two
            seemingly distinct domains into a harmonious symphony of innovation.
          </p>
        </div>

        <div className="home-info-section">
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
