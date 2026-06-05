import React from "react";
import { FiBell, FiSearch, FiLogOut, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { logoutUserApi } from "../../service/apiCollections";
import { Block, Confirm } from "notiflix";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";



const AdminNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

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

          toast.success(response.message);

          window.location.href = "/login";
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

  const { userDetails } = useSelector(state => state.user);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-3 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
          <FiMenu size={20} className="text-white" />
        </button>

        <h2 className="text-lg md:text-xl font-semibold text-white">
          Admin Dashboard
        </h2>
      </div>
      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
          <FiSearch className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          <FiBell size={20} className="text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-white font-medium">
            {userDetails?.name || "Admin"}
          </span>
          <span className="text-xs text-slate-400">Administrator</span>
        </div>

        <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
          {userDetails?.profilePic ?
            <img
              src={userDetails.profilePic}
              alt="admin"
              className="w-full h-full object-cover"
            />
          : <span className="text-white font-bold">
              {userDetails?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
          }
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg  md:p-2  bg-slate-800 hover:bg-red-600 transition">
          <FiLogOut size={20} className="text-white" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
