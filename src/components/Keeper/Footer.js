import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}  SAHIL BHATT</p>
    </footer>
  );
}

export default Footer;
