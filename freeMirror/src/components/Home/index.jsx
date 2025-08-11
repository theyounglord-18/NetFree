import React from 'react'
import BannerSection from '../BannerSection'
import "./index.css"
import TopRatedSection from '../TopRatedSection'
const Home = () => {
  return (
    <div className='homepage'>
        <BannerSection/>
        <TopRatedSection/>
    </div>
  )
}

export default Home