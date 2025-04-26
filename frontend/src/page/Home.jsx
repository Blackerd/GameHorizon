import React from "react";
import Category from '../component/Category'
import Product from '../component/Product'
import Banner from '../component/Banner'
import Footer from '../component/Footer'
import Header from "../component/Header";


const Home = () => {
  return (
    <div>
      {/* Phần Header */}
      <Header />
      {/* Phần Banner */}
      <Banner />
      {/* Phần Category */}
      <Category />

      {/* Phần Product */}
      <Product />
      {/* Phần Footer */}
      <Footer />
    </div>
  );
};

export default Home;
