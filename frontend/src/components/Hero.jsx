import React from 'react'
import heroImg from "../assets/hero.png"
import { Link, useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate();

  return (
    <div className='md:h-[80vh] flex flex-col items-center justify-center md:flex-row '>
      <div className='w-full lg:w-1/2  flex flex-col items-center lg:items-start justify-center md:mb-0 mb-12'>
      <h1 className='text-yellow-100  text-4xl lg:text-7xl font-semibold text-center lg:text-left  '>Discover Your Next Great Book</h1>
      <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books. 
        <span className='underline font-semibold'> (Login Credentials for both user and admin are mentioned on <Link className='text-blue-400' to={'/log-in'}> Login page. </Link>) </span></p>
      <div className='mt-8 '>
      <button onClick={() => navigate("/all-books")} className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full '>
        Discover Books
      </button>
      </div>
     
      </div>
      <div className='w-full lg:w-1/2 h-auto lg:h-[100%] flex items-center justify-center'>
      <img src={heroImg} alt="" />
      </div>
    </div>
  )
}

export default Hero
