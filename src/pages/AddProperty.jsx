import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProperty = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: [e.target.value] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/properties", formData, {
        headers: { Authorization: token },
      });
      toast.success("Property added successfully!");
      navigate("/agent-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Add property failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={formData.images[0]}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
