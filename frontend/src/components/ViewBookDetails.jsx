import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import Loader from "./Loader";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const ViewBookDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      // console.log(res?.data?.data)
      setData(res?.data?.data);
    };
    fetch();
  }, [id]);

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const deleteBook = async() => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book" , {headers})
    toast.success(response.data.message)
    navigate('/all-books')
  }


  return (
    <>
      {Data && (
        <div className="px-4 lg:px-12 py-8 bg-zinc-900 flex gap-8  flex-col md:flex-row">
          <div className=" w-full lg:w-1/2  ">
            <div className="bg-zinc-800 rounded p-12 py-12  md:flex  justify-around">
              <img src={Data.url} alt="" className="lg:h-[70vh] h-[50vh]" />
              {isLoggedIn === true && role === "user" && (
                <div className=" md:flex  md:flex-col flex md:justify-start md:gap-10 items-center justify-evenly mt-6">
                  <button
                    className="bg-white rounded  lg:rounded-full cursor-pointer flex items-center justify-center gap-1 text-xl md:text-3xl p-2  text-red-500"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="block md:hidden">Favourites</span>
                  </button>
                  <button
                    className="text-white rounded flex items-center justify-center gap-2 lg:rounded-full cursor-pointer text-xl md:text-3xl ml-2 p-2 lg:mt-0 bg-blue-500"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="block md:hidden">Add To Cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn === true && role === "admin" && (
                <div className=" md:flex  md:flex-col flex md:justify-start md:gap-10 items-center justify-evenly mt-6">
                  <Link to={`/update-book/${id}`} className="bg-white rounded  lg:rounded-full cursor-pointer flex items-center justify-center gap-1 text-xl md:text-3xl p-2  text-red-500" 
                  >
                    <FaEdit />
                    <span className="block md:hidden">Edit Book</span>
                  </Link>
                  <button className="text-red rounded flex items-center justify-center gap-2 lg:rounded-full cursor-pointer text-xl md:text-3xl ml-2 p-2 lg:mt-0 bg-white"
                  onClick={deleteBook} 
                  >
                    <MdDelete />

                    <span className="block md:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full lg:w-1/2">
            <h1 className="text-zinc-200 mt-1 text-4xl font-bold">
              {Data.title}
            </h1>
            <p className="text-zinc-200 mt-1">by {Data.author}</p>
            <p className="text-zinc-400 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400 gap-2">
              <GrLanguage />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹{Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="bg-zinc-900 h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
