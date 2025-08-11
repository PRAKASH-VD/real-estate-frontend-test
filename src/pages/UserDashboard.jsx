import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my", {
          headers: { Authorization: token },
        });
        setAppointments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointments();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((a) => (
          <div key={a._id} className="border p-4 rounded shadow">
            <p><strong>Property:</strong> {a.property.title}</p>
            <p><strong>Agent:</strong> {a.agent.name}</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
