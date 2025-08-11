import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { toast } from "react-toastify";

const PropertyDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  // Fetch property details when component mounts
  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      const res = await api.post(
        "/appointments",
        {
          propertyId: property._id,
          date,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment booked successfully!");
      setDate("");
      setMessage("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p>{property.description}</p>
      <p className="mt-2">
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Price:</strong> ₹{property.price}
      </p>
      <p>
        <strong>Rooms:</strong> {property.rooms}
      </p>

      {/* Booking form */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded p-2 mt-1"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
