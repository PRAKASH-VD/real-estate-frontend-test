import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import UserDashboard from "./pages/UserDashboard";
import Unauthorized from "./pages/Unauthorized";
import AddProperty from "./pages/AddProperty";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute roles={["Agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roles={["User", "Agent", "Admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute roles={["Agent"]}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
