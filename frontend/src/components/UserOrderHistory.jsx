import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { MdDisabledByDefault } from "react-icons/md";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [orderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      console.log(response.data.data);
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!orderHistory && (
        <div className="h-[100%] flex items-center justify-center ">
          {" "}
          <Loader />
        </div>
      )}

      {orderHistory && orderHistory.length === 0 && (
        <div>
          <div>
            <h1 className="text-4xl font-semibold text-zinc-300 ">No Order history</h1>
            <div className="flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              className="h-[20vh] mt-24"
              alt=""
            />
            </div>
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>

            <div className="w-[22%]">
              <h1 className="ml-2 md:ml-6">Books</h1>
            </div>

            <div className="w-[45%]">
              <h1 className="md:ml-28">Description</h1>
            </div>

            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>

            <div className="w-[16%]">
              <h1 className="ml-2">Status</h1>
            </div>

            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>

          {orderHistory.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer  "
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="w-[22%]">
                {items.book ? (
                  <Link
                    to={`/view-books-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-gray-500">Book not available</span>
                )}
              </div>

              <div className="w-[45%]">
                <h1>
                  {items.book && items.book.desc
                    ? items.book.desc.slice(0, 50) + " ..."
                    : "Description not available"}
                </h1>
              </div>

              <div className="w-[9%]">
                {items.book ? `₹ ${items.book.price}` : "Price not available"}
              </div>

              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {/*  */}
                  {items.status === "Out for Delivery" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Order Cancelled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : items.status === "Delivered" ? (
                    <div className="text-green-500">{items.status}</div>
                  ) : (
                    <div>{items.status}</div>
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
