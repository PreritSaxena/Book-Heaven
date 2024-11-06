import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const LogIn = () => {


  const navigate = useNavigate()
  const[values , setValues] = useState({
    username : "",
    password: "",
  })

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const {name , value} = e.target;
    setValues({...values , [name] : value})
  }

  const submitHandler = async() => {
    try{
      if(values.username === "" ||  values.password === "" ){
        toast.error("All fields are Required")
      }
      else{
        // console.log(values)
        const response = await axios.post("http://localhost:1000/api/v1/sign-in" , 
          values
        );
        const role = response.data.role;
        dispatch(authActions.login());
        dispatch(authActions.changeRole(role));
        localStorage.setItem("id" , response.data.id);
        localStorage.setItem("token" , response.data.token);
        localStorage.setItem("role" , role);
        navigate("../profile")
        // console.log(response.data)
      }
    }
    catch(err){
      // console.log(err.response)
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-[88vh] px-12 py-8'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-1/2 lg:w-1/3  '>
        <h1 className='text-zinc-300 text-xl'>Login</h1>
        <div className='text-zinc-300'>
        <h2 className='mt-1'>Credentials :</h2>
        <p className='mt-1'>User : Username - user , password-12345678</p>
        <p className='mt-1'>Admin : Username - admin , password-12345678</p>
        </div>
        <div className='mt-4'>
          <div className=''>
            <label htmlFor="" className='text-zinc-100 '>Username</label>
            <input type="text"
             placeholder='username'
             name='username'
             value={values.username}
             onChange={changeHandler}
             required
             className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>

          <div className='mt-4'> 
            <label htmlFor="" className='text-zinc-100'>Password</label>
            <input type="password"
             placeholder='password'
             value={values.password}
             onChange={changeHandler}
             name='password'
             required
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>
          <div className='mt-4'>
          <button onClick={submitHandler} className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:text-blue-500  hover:bg-slate-300 transition-all duration-200'>Login</button>
        <p className='text-center mt-4 text-zinc-100 font-semibold'>Or</p>
        <p className='text-center text-zinc-500 p-1'>Don't have an account?  <span onClick={()=> navigate("/sign-up")} className="underline cursor-pointer hover:text-blue-400">SignUp</span> </p>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default LogIn
