import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get(`/properties/agent/${user._id}`, {
          headers: { Authorization: token },
        });
        setProperties(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProperties();
  }, [token, user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Agent Dashboard</h2>
      <Link to="/add-property" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Property
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p>{p.location}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
