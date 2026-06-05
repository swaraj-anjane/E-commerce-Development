import React from "react";
import { NavLink } from "react-router";
import {
  FiHome,
  FiBox,
  FiPlusSquare,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FiHome size={18} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FiBox size={18} />,
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <FiPlusSquare size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingBag size={18} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers size={18} />,
    },
  ];

  return (
    <aside
      className={`
    fixed md:static top-0 left-0 z-50
    w-64 h-screen
    bg-slate-900 border-r border-slate-800
    flex flex-col
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>

        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-white text-2xl">
          ×
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ?
                  "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800"
              }`
            }>
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-sm text-slate-400">E-Commerce Admin</p>
          <p className="text-white font-medium">Swaraj Store</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
