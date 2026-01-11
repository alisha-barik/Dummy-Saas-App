import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/Tasks">Tasks</Link>

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
