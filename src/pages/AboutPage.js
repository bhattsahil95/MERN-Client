import React from 'react';


const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="hero">
        <h1>About Me</h1>
        <h3>A finance professional with an active interest in Technology.</h3>
      </header>

      <div id="particles-js"></div>

      <h3 className="section-title">Connect with me:</h3>
      <p className="social-links">
        <a href="https://ca.linkedin.com/in/sahil-bhatt-ab5238a0" target="blank">
          <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" />
        </a>
      </p>

      <h3 className="section-title">Languages and Tools:</h3>
      <p className="languages-tools">
        <a href="https://backbonejs.org" target="_blank" rel="noreferrer">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/backbonejs/backbonejs-original-wordmark.svg" alt="Backbone.js" />
        </a>
        <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="Bootstrap" />

        </a>
    
      </p>
    </div>
  );
};

export default AboutPage;
