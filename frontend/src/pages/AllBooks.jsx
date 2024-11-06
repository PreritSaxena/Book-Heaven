import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const AllBooks = () => {

    const [Data , setData] = useState();
    useEffect(()=> {
        const fetch = async ()=> {
           const res = await axios.get("http://localhost:1000/api/v1/get-all-books");
            setData(res?.data?.data);
        }
        fetch();
    },[])

  return (
    <div className='py-8 px-12  bg-zinc-900 '>
      <h2 className='text-4xl text-yellow-100'>All Books</h2>
      {!Data &&  
      <div className='h-[100vh] flex items-center justify-center my-10'>
        <Loader/>
      </div>
      }
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            { 
                Data && Data.map((items, index) => (
                    <div key={index}>
                     <BookCard data={items}/>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

export default AllBooks
