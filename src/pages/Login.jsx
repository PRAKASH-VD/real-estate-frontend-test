import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
