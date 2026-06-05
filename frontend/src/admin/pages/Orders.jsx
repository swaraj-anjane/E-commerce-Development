import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Orders = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
const [orders, setOrders] = useState([]);
const [selectedOrder, setSelectedOrder] = useState(null);
  // const orders = [
  //   {
  //     id: "#ORD-1001",
  //     customer: "Rahul Sharma",
  //     products: 2,
  //     amount: "₹2,500",
  //     status: "Pending",
  //   },
  //   {
  //     id: "#ORD-1002",
  //     customer: "Amit Verma",
  //     products: 1,
  //     amount: "₹79,999",
  //     status: "Shipped",
  //   },
  //   {
  //     id: "#ORD-1003",
  //     customer: "Priya Singh",
  //     products: 3,
  //     amount: "₹5,200",
  //     status: "Delivered",
  //   },
  // ];

  const filteredOrders = orders.filter(order => {
  const matchesSearch =
    order.orderId.toLowerCase().includes(search.toLowerCase()) ||
    (order.user?.name || order.address?.fullName || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter = filter === "All" || order.orderStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (id, orderStatus) => {
    try {
      // await axios.put(`http://localhost:8080/order/${id}/status`, {
      //   orderStatus,
      // });
      await axios.put(
        `https://e-commerce-development.onrender.com/order/${id}/status`,
        { status },
      );

      setOrders(prev =>
        prev.map(order =>
          order._id === id ? { ...order, orderStatus } : order,
        ),
      );
      toast.success("Order Status Updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const res = await axios.get("http://localhost:8080/order");
        const res = await axios.get(
          "https://e-commerce-development.onrender.com/order",
        );

        setOrders(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Orders</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Order..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm text-white">
            
            <option>All</option>
            <option>pending</option>
            <option>confirmed</option>
            <option>shipped</option>
            <option>delivered</option>
            <option>cancelled</option>
          </select>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] table-fixed">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-center py-3">Order ID</th>
                <th className="text-center py-3">Customer</th>
                <th className="text-center py-3">Products</th>
                <th className="text-center py-3">Amount</th>
                <th className="text-center py-3">Status</th>
                <th className="text-center py-3">Action</th>
                <th className="text-center py-3">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id} className="border-b border-slate-800">
                  <td className="text-center py-4">{order.orderId}</td>

                  <td className="text-center">
                    {order.user?.name || order.address?.fullName}
                  </td>

                  <td className="text-center">{order.items.length}</td>

                  <td className="text-center">₹{order.totalAmount}</td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.orderStatus === "pending" ? "bg-yellow-600"
                        : order.orderStatus === "shipped" ? "bg-blue-600"
                        : "bg-green-600"
                      }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    <select
                      value={order.orderStatus}
                      onChange={e =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
                      <option>pending</option>
                      <option>confirmed</option>
                      <option>shipped</option>
                      <option>delivered</option>
                      <option>cancelled</option>
                    </select>
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white">
                      👁 Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* details Modal */}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl w-[500px]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Order Details
            </h2>

            <div className="space-y-2 text-white">
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>

              <p>
                <strong>Customer:</strong>{" "}
                {selectedOrder.user?.name || selectedOrder.address?.fullName}
              </p>

              <p>
                <strong>Contact:</strong> {selectedOrder.address?.contact}
              </p>

              <p>
                <strong>Payment:</strong> {selectedOrder.paymentMethod}
              </p>

              <p>
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>

              <p>
                <strong>Total:</strong> ₹{selectedOrder.totalAmount}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              Delivery Address
            </h3>

            <div className="text-slate-300">
              <p>{selectedOrder.address?.house}</p>
              <p>{selectedOrder.address?.city}</p>
              <p>{selectedOrder.address?.state}</p>
              <p>{selectedOrder.address?.pincode}</p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              Products
            </h3>

            {selectedOrder.items.map(item => (
              <div
                key={item._id}
                className="flex justify-between border-b border-slate-700 py-2 text-white">
                <span>{item.productDetails?.name || "Product"}</span>

                <span>Qty: {item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
