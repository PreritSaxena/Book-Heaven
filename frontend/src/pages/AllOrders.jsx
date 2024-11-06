import axios from "axios";
import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";
import { IoOpenOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import UserData from "./UserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    // bookid : id
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const setStatusHandler = (i) => {
    setOptions(i);
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      values,
      { headers }
    );
    toast.success(response.data.message);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      // console.log(response.data.data);
      setAllOrders(response.data.data);
    };
    fetch();
  }, [allOrders]);
  return (
    <>
      {!allOrders && (
        <div className="flex h-[100%] items-center justify-center">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="bg-zinc-800 ">
            <div className="mt-4 w-full rounded py-2 px-4 flex gap-2">
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
                <FaUser />
              </div>
            </div>
            {allOrders.map((items, i) => (
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
                  <button
                    className="font-semibold text-green-500"
                    onClick={() => setStatusHandler(i)}
                  >
                    {/* Order Placed */}
                    {items.status === "Out for Delivery" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Order Cancelled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : items.status === "Delivered" ? (
                      <div className="text-green-500">{items.status}</div>
                    ) : (
                      <div>{items.status}</div>
                    )}
                  </button>
                  <div className={`${options === i ? "block" : "hidden"}`}>
                    <select
                      onChange={changeHandler}
                      value={values.status}
                      name="status"
                      className="bg-gray-800 mt-1"
                    >
                      {[
                        "Order placed",
                        "Out for Delivery",
                        "Delivered",
                        "Order Cancelled",
                      ].map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                      className="text-green-500 hover:text-red-500 mx-2"
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>
                <div className="w-none md:w-[5%] hidden md:block">
                  <button
                    onClick={() => {
                      setUserDiv("fixed");
                      setUserDivData(items.user);
                    }}
                    className="text-2xl hover:text-orange-500 transition-all duration-200 text-zinc-400 "
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userDivData && (
        <UserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
