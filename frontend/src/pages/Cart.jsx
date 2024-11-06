import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { MdDelete } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom";

const Cart = () => {

  const [cart , setCart] = useState();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate()

  const headers = {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  } 

  useEffect(()=>{
    const fetch = async() => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-cart" , {headers})
      setCart(response.data.data)
    }
    
    fetch()
  },[cart])
  

  const deleteItem = async(bookid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`, 
    {},
    {headers})
    toast.success(response.data.message)
  } 

  useEffect(()=>{
    if(cart && cart.length > 0){
        let total = 0;
        cart.map((item)=> {
            total += item.price
        }) ;
        setTotal(total);
        // total = 0;
    }
    
  },[cart])

  const placeOrder = async() => {
     try{
       const response = await axios.post('http://localhost:1000/api/v1/place-order' , 
        {order:cart},
        {headers}
       );
       toast.success(response.data.message)
       navigate("/profile/orderHistory")
     }
     catch(err){
      console.log(err)
     }
  }

  return (

    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {!cart && <div className='h-[100%] flex items-center justify-center'><Loader/></div> }
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
          </h1>
          <MdOutlineRemoveShoppingCart className='text-7xl text-blue-500 mt-10' />
        </div>
       </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl py-4 font-semibold text-zinc-400'>Your Cart</h1>
          {
            cart.map((item,index) => (
              <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={index}>
                <img className='h-[20vh] md:h-[10vh] object-cover' src={item.url} alt="" />
                <div className='w-full md:w-auto'>
                  <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                    {item.title}</h1>
                  <p className='text-normal text-zinc-300  mt-2 hidden lg:block'>
                    {item.desc.slice(0,100)}...</p>
                  <p className='text-normal text-zinc-300  mt-2 hidden md:block lg:hidden'>
                    {item.desc.slice(0,65)}...</p>
                  <p className='text-normal text-zinc-300  mt-2 block md:hidden'>
                    {item.desc.slice(0,100)}...</p>
                </div>

                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ₹ {item.price}
                  </h2>
                  <button className='bg-red-100 text-red-500 border border-red-700 rounded p-2 ms-12' onClick={()=>deleteItem(item._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          }
        </>
      )}

      {
        cart && cart.length > 0 && (
          <div className='mt-4 w-full flex items-center justify-end'>
            <div className='p-4 bg-zinc-800 rounded'>
              <h1 className='text-3xl text-zinc-200 font-semibold '>
                  Total Amount 
              </h1>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                <h2>{cart.length} books <span className='ml-10'>₹ {total}</span></h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold
                       hover:bg-zinc-100' onClick={placeOrder} >
                  Place your order
                </button>
              </div>

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Cart
