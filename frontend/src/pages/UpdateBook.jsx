import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const UpdateBook = () => {

  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value });
  };

  const {id} = useParams()
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : id
  };

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

  const submitHandler = async () => {
    if (
      data.url === "" ||
      data.title === "" ||
      data.author === "" ||
      data.price === "" ||
      data.desc === "" ||
      data.language === ""
    ) {
      toast.error("All Fields are required");
    } else {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        data,
        { headers }
      );
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      // console.log(response)
      toast.success(response.data.message);
      navigate(`/view-books-details/${id}`)
      
    }
  };
  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label className="text-zinc-400">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of Image"
            required
            name="url"
            value={data.url}
            onChange={changeHandler}
          />
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Title of Book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of Book"
            required
            name="title"
            value={data.title}
            onChange={changeHandler}
          />
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Author of Book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            required
            name="author"
            value={data.author}
            onChange={changeHandler}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              required
              name="language"
              value={data.language}
              onChange={changeHandler}
            />
          </div>
          <div className="w-1/2">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price of book"
              name="price"
              value={data.price}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Description of Book</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="description of book"
            required
            name="desc"
            value={data.desc}
            onChange={changeHandler}
          />
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-200"
          onClick={submitHandler}
        >
          Update Book
        </button>
      </div>
    </div>
  )
}

export default UpdateBook
