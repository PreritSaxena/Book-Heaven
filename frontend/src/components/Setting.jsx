import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import toast from 'react-hot-toast';

const Setting = () => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [value, setValue] = useState();
  const [profileData , setProfileData] = useState()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-info",
        { headers }
      );
      // console.log(response.data)
      setProfileData(response.data)
      setValue({address : response.data.address});  
    };
    fetch();
  }, []);

  const changeHandler = (e) => {
    const {name,value} = e.target;
    setValue({...value ,[name] : value})
  } 

  const submitHandler = async() => {
      const response = await axios.put("http://localhost:1000/api/v1/update-address" , value , {headers})
      toast.success(response.data.message)
  }
  return (
    <div>
      {!profileData && (
        <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div>
      )}

      {
        profileData && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
            <div>
              <div className='flex gap-12'>
               <div>
                <label>Username</label>
                  <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
               </div>
               
               <div>
                <label>Email</label>
                  <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.email}</p>
               </div>
               </div>

               <div className='mt-4 flex flex-col'>
                <label>Address</label>
                <textarea
                className='p-2 rounded bg-zinc-800 mt02 font-semibold'
                rows="5"
                onChange={changeHandler}
                name='address'
                placeholder='address'
                value={value.address}
                />
               </div>

               <div className='mt-4 flex justify-end'>
                <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 ' 
                onClick={submitHandler}>Update</button>
               </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Setting
