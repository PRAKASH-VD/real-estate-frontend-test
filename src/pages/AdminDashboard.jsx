import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/analytics", {
          headers: { Authorization: token },
        });
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Agents</h3>
          <p>{stats.totalAgents}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Properties</h3>
          <p>{stats.totalProperties}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
