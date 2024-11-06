import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const BookCard = ({data , favourite}) => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
    bookid : data._id,
  } 

  const handleRemoveBook = async() => {
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-to-favourite" ,
      {} , 
      {headers})
      toast.success(response.data.message)
  }

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/view-books-details/${data._id}`}>
    
    <div className='bg-zinc-900 rounded flex items-center justify-center '>
      <img src={data.url} className='h-[25vh]' />
    </div>
    <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
    <p className='mt-2  text-zinc-400 font-semibold'>by {data.author}</p>
    <p className='mt-2  text-zinc-200 font-semibold text-xl'>₹ {data.price}</p> 
    </Link>
    {favourite && (
      <button className='bg-zinc-900 px-4 py-2 rounded border border-zinc-500 mt-4 text-zinc-100' onClick={handleRemoveBook}>Remove from favourite</button>
    )}
    
    </div>
  )
}

export default BookCard
