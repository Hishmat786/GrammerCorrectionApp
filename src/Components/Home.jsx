import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      navigate("/grammar-checker");
    }
  }, [navigate]);

  
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      alert("Login Successful!");
      navigate("/grammar-checker");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-bold text-center">Login</h2>

          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
