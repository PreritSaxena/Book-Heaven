import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {

  const[values , setValues] = useState({
    username : "",
    email : "",
    password: "",
    address : ""
  })
  
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const {name , value} = e.target;
    // It takes all the current key-value pairs from values (using { ...values }).
    // Then, it updates the key corresponding to the current input field ([name]) with the new value (value).

    // conclusion
    // ensures that:
    // The existing state (values) is copied.
    // Only the field currently being changed (identified by name) is updated with the new value.
    // All other fields remain unchanged.
    setValues({...values , [name] : value})
  }

  const submitHandler = async() => {
    try{
      if(values.username === "" || values.email === "" || values.password === "" || values.address === ""){
        toast.error("All fields are Required")
      }
      else{
        // console.log(values)
        const response = await axios.post("http://localhost:1000/api/v1/sign-up" , 
          values
        );
        toast.success(response.data.message)
        navigate("/log-in")
      }
    }
    catch(err){
      // console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-auto px-12 py-8'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-1/2 lg:w-1/3 mb-8  '>
        <h1 className='text-zinc-300 text-xl'>Sign Up</h1>
        <div className='mt-4'>
          <div className=''>
            <label htmlFor="" className='text-zinc-100 '>Username</label>
            <input type="text"
             placeholder='username'
             name='username'
             required
             value = {values.username}
             onChange={changeHandler}
             className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>

          <div className='mt-4'> 
            <label htmlFor="" className='text-zinc-100'>Email</label>
            <input type="email"
             placeholder='example@gmail.com'
             name='email'
             required
             value = {values.email}
             onChange={changeHandler}
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-100'>Password</label>
            <input type="password"
             placeholder='password'
             name='password'
             required
             value = {values.password}
             onChange={changeHandler}
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-100'>Address</label>
            <textarea 
            rows="5"
             placeholder='address'
             name='address'
             required
             value = {values.address}
             onChange={changeHandler}
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            />
          </div>
          <div className='mt-4'>
          <button onClick={submitHandler} className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:text-blue-500  hover:bg-slate-300 transition-all duration-200'>SignUp</button>
        <p className='text-center mt-4 text-zinc-100 font-semibold'>Or</p>
        <p className='text-center text-zinc-500 p-1'>Already have an account? <Link to="../log-in"> <span className="underline cursor-pointer hover:text-blue-400">Login</span></Link></p>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default SignUp
