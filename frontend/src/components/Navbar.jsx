import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role); 
  // console.log(isLoggedIn)

  if(isLoggedIn === false){
    links.splice(2,3)
  }

  if(isLoggedIn === true && role === "user"){
    links.splice(4,1)
  }

  if(isLoggedIn === true && role === "admin"){
    links.splice(2,2)
  }

  return (
    <>
      <nav className="relative z-50 bg-zinc-800 text-white px-8 py-2 flex items-center justify-between">
        <Link to={"/"} className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            className="h-10 me-4"
            alt="Logo"
          />
          <h1 className="text-2xl font-semibold">Book Heaven</h1>
        </Link>
        <div className="block md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4">
            {links.map((items, index) => (
              <Link
                to={items.link}
                key={index}
                className="hover:text-blue-500 transition-all duration-200 cursor-pointer"
              >
                {items.title}
              </Link>
            ))}
          </div>
          {
            isLoggedIn === false && <div className="hidden md:flex gap-4">
            <button
              onClick={() => navigate("/log-in")}
              className="px-4 py-1 rounded-lg border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-200"
            >
              LogIn
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="px-4 py-1 bg-blue-500 rounded-lg hover:bg-white hover:text-zinc-800 transition-all duration-200"
            >
              SignUp
            </button>
          </div>
          }
          <button 
            onClick={toggleMenu}
            className="text-white text-2xl text-center hover:text-zinc-400 md:hidden"
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } bg-zinc-800 font-semibold text-4xl h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center text-white`}
      >
        {links.map((items, index) => (
          <Link
            to={items.link}
            key={index}
            className="hover:text-blue-500 mb-8 transition-all duration-200 cursor-pointer"
            onClick={toggleMenu} 
          >
            {items.title}
          </Link>
        ))}

       {
        isLoggedIn === false &&  <div className="flex flex-col">
        <button
          onClick={() => {
            navigate("/log-in");
            toggleMenu(); // Close menu after clicking button
          }}
          className="px-7 py-2 mb-8 rounded-lg border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-200"
        >
          LogIn
        </button>
        <button
          onClick={() => {
            navigate("/sign-up");
            toggleMenu(); // Close menu after clicking button
          }}
          className="px-7 py-2 mb-8 bg-blue-500 rounded-lg hover:bg-white hover:text-zinc-800 transition-all duration-200"
        >
          SignUp
        </button>
        </div>
       }
      </div>
    </>
  );
};

export default Navbar;
