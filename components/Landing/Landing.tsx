import React from "react";
import Banner from "./Banner";
import Features from "../Features/Features";
import Footer from "../Footer";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col">
        <Banner />
        <Features />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
