
import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    lowStockProducts: 0,
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8080/dashboard/stats");

        setStats(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard title="Total Products" value={stats.totalProducts} />
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Low Stock Products" value={stats.lowStockProducts} />
      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
        
        <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
