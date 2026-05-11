import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { logoutUserApi } from "../../service/apiCollections";
import { Confirm } from "notiflix";

const NavBar = () => {
  const { isLoggedIn, userDetails } = useSelector(store => store.user);
  const user = userDetails;
  const {totalItems} = useSelector((store)=>store.cart)

  async function handleLogout() {
    // let ask = confirm("are you sure to logout?");
    Confirm.show(
      "Logout User",
      "Are you sure to logout?",
      "logout",
      "cancel",
      async () => {
        try {
          const response = await logoutUserApi();
          window.location.reload();
          toast.success(response.data.message);
        } catch (error) {
          toast.error("failed to logout");
        }
      },
      () => {
        toast.error("If you say so...");
      },
      {},
    );
    // if (!ask) {
    //   return;
    // }
  }

  const navData = [
    { link: "/", label: "Home" },
    { link: "/product", label: "product" },
    { link: "/order", label: "My orders" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">ShopSphere</h1>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navData.map((nav, navIdx) => (
            <Link key={navIdx} to={nav.link}>
              {nav.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-lg">
          <FaSearch className="cursor-pointer" />
          <FaHeart className="cursor-pointer" />
          <Link
            to={"/cart"}
            className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105">
            {/* Cart Icon */}
            <FaShoppingCart className="text-[17px]" />

            {/* Cart Count */}
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-black text-white text-[10px] font-semibold border-2 border-white">
              {totalItems}
            </span>
          </Link>
          {isLoggedIn ?
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
                {user.profilePic ?
                  <img className="size-6 rounded-full" src={user.profilePic} />
                : <FaUserCircle className="text-2xl" />}
                <span className="text-sm font-medium hidden sm:block">
                  {user?.name}
                </span>
                <FaChevronDown className="text-xs" />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-full text-sm">
                logout
              </button>
            </div>
          : <div className="flex items-center gap-3">
              <Link to={"/login"} className="text-sm font-medium">
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-black text-white px-5 py-2 rounded-full text-sm">
                Sign Up
              </Link>
            </div>
          }
        </div>
      </div>
    </header>
  );
};

export default NavBar;
