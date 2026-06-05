import { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/order");

        setOrders(res.data.data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full  min-w-[700px] table-fixed text-left">
        <thead>
          <tr className="border-b  border-slate-800">
            <th className="w-[35%] py-3 px-8 text-slate-400">Order ID</th>
            <th className="w-[25%] py-3 px-2 text-slate-400">Customer</th>
            <th className="w-[20%] py-3  text-slate-400">Amount</th>
            <th className="w-[20%] py-3 px-3  text-slate-400">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr
              key={order._id}
              className="border-b border-slate-800  hover:bg-slate-800/40 transition">
              <td className="py-4 pr-4 break-all">{order.orderId}</td>
              <td>{order.user?.name || order.address?.fullName}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.orderStatus === "pending" ? "bg-yellow-600"
                    : order.orderStatus === "shipped" ? "bg-blue-600"
                    : order.orderStatus === "delivered" ? "bg-green-600"
                    : "bg-green-600"
                  }`}>
                  {order.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
