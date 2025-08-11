import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProps = async () => {
      const res = await api.get("/properties");
      setProperties(res.data);
    };
    fetchProps();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {properties.map((p) => (
        <div key={p._id} className="border p-4 rounded shadow">
          <img src={p.images[0]} alt={p.title} className="h-48 w-full object-cover rounded mb-2" />
          <h2 className="text-lg font-bold">{p.title}</h2>
          <p>{p.location}</p>
          <p>₹{p.price}</p>
          <Link to={`/property/${p._id}`} className="text-blue-600">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
