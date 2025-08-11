import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"><Link to="/">RealEstateHub</Link></h1>
        <ul className="flex space-x-4 items-center">
          {user && user.role === "Admin" && (
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          )}
          {user && user.role === "Agent" && (
            <li><Link to="/agent-dashboard">Agent Dashboard</Link></li>
          )}
          {user && (
            <>
              <li><Link to="/user-dashboard">Dashboard</Link></li>
              <li><button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button></li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
