import React from 'react'
import Hero from '../components/Hero'
import RecentlyAdded from '../components/RecentlyAdded'

const Home = () => {
  return (
   <div className='bg-zinc-900 px-10 py-8 text-white '>
    <Hero/>
    <RecentlyAdded/>
  </div>
  )
}

export default Home
