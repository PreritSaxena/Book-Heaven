import React from 'react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const SideBar = ({data}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role)

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]  '>
      <div className='flex flex-col items-center justify-center'>
      <img src={data.avatar} className='h-[12vh]' />
      <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
      <p className='mt-1 text-zinc-300'>{data.email}</p>
      <hr  className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'/>
      </div>
     

      {
        role === 'user' && 
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to='/profile'
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-200">
          Favourites
        </Link>

        <Link to='/profile/orderHistory'
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-200">
          Order History
        </Link>

        <Link to='/profile/setting'
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-200"  
        >
          Settings
        </Link>
      </div>
      }

      {
        role === 'admin' && 
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to='/profile'
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-200">
          All Order
        </Link>

        <Link to='/profile/add-book'
        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-200">
          Add Book
        </Link>
        </div>
      }

      <button className='flex flex-row items-center justify-center bg-zinc-900 w-1/2 lg:w-full mt-4
       lg:mt-0 text-white font-semibold py-3
       hover:text-zinc-900 hover:bg-white transition-all duration-200 ' 
       onClick={()=>{
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"))
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role")
        navigate("/")
       }}>
      LogOut 
      <FaArrowRightFromBracket className='ms-4'/>
      </button>
    </div>
  )
}

export default SideBar
