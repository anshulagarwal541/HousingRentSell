import React from 'react'
import NavBar from '../components/navBar';
import Front from '../components/AboutUs/Front';
import Stats from '../components/home/Stats';
import FounderNote from '../components/AboutUs/FounderNote';
import Team from '../components/AboutUs/Team';
import Footer from '../components/footer';
function AboutUs() {
  return (
    <div className='bg-[#ffffff]'>
      <Front />
      <Stats />
      <FounderNote />
      <Team />
    </div>
  )
}

export default AboutUs