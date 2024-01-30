import React from "react";
import "../App.css";
import Products from "../components/Products.jsx";
import Navbar from "../components/NavBar.js";

function Home() {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
}

export default Home;
