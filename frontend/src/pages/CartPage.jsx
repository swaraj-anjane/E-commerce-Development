import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaTag,
  FaLock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartItemAsync, removeCartItemAsync, updateCartQuantityAsync, } from "../redux/cartSlice";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { removeUserCartItemApi } from "../service/apiCollections";


export default function CartPage() {
  const cartItems = useSelector(store => store.cart.cartItems);
  // const [cartItems, setCartItems] = useState(initialCartItems);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const increaseQty = (id) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  //     ),
  //   );
  // };

  // const decreaseQty = (id) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item,
  //     ),
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  const removeitem = async (id) => {
         dispatch(removeCartItemAsync(id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalMrp = cartItems?.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0,
  );
  const savings = totalMrp - subtotal;

  useEffect(() => {
    dispatch(getUserCartItemAsync());
  }, []);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => Navigate("/Product")}
          className="flex items-center gap-2 text-sm font-medium mb-8 cursor-pointer">
          <FaArrowLeft /> Continue Shopping
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">Your Shopping Cart</h1>

            {cartItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                <img
                  src={item.poster || item?.img || item?.thumbnail}
                  alt={item.name}
                  className="w-full sm:w-40 h-40 object-cover rounded-2xl"
                />

                <div className="flex-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        {item.brand} • {item.category}
                      </p>
                      <h2 className="text-xl font-semibold mt-1">
                        {item.name}
                      </h2>
                      {/* <span className="inline-block mt-2 bg-black text-white text-xs px-3 py-1 rounded-full">
                        {item.discount}
                      </span> */}
                    </div>
                    <button
                      onClick={() => {
                        // console.log("item id is",item.id);

                        removeitem(item.id);
                      }}
                      className="text-gray-400 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold">₹{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.mrp}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(
                              updateCartQuantityAsync({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            );
                          }
                        }}
                        className="px-4 py-2 hover:bg-gray-100">
                        <FaMinus />
                      </button>
                      <span className="px-5 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartQuantityAsync({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="px-4 py-2 hover:bg-gray-100">
                        <FaPlus />
                      </button>
                    </div>

                    <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                      <FaTag /> Extra coupon applicable on checkout
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Price Details</h2>

              <div className="space-y-4 text-sm border-b pb-5">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{totalMrp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount on MRP</span>
                  <span className="text-green-600">- ₹{savings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-5 text-xl font-bold">
                <span>Total Amount</span>
                <span>₹{subtotal}</span>
              </div>

              <p className="text-sm text-green-600 font-medium mb-5">
                You saved ₹{savings} on this order
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-4 rounded-full font-semibold text-sm shadow-lg hover:opacity-90 cursor-pointer transition flex items-center justify-center gap-2">
                <FaLock /> Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
