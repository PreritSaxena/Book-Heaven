import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import BookCard from './BookCard';

const Favourites = () => {

  const [favouriteBooks , setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  } 

  useEffect(()=> {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books" 
      ,{headers}
    )
    setFavouriteBooks(response.data.data)
  };
    fetch();
  },[favouriteBooks])

  return (
    <>
      {favouriteBooks && favouriteBooks.length === 0 &&( 
      <div className='text-5xl font-semibold h-[100%] text-zinc-400 flex flex-col  items-center justify-center w-full'>
        No Favourite Books
        <FaBook  className='mt-6 text-blue-500'/>
      </div>)}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
      {favouriteBooks && favouriteBooks.map((items , index)=> 
      <div key={index}> 
      <BookCard data = {items} favourite={true}/>
      </div>)}
    </div>
    </>

  )
}

export default Favourites
