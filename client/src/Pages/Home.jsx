import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import TopProducts from '../Components/TopProducts';
import SpecialProducts from '../Components/SpecialProducts';
import ProductCarousal from '../Components/ProductCarousal';

const Home = () => {
    const user=useSelector((state)=>state.user);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ProductCarousal/>
      <TopProducts/>
      <SpecialProducts/>
    </div>
  )
}

export default Home
