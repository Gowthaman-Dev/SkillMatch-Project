import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputvalue, setInputValue] = useState({ email: "", password: "" });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/auth/login",
        inputvalue
      );

      // Save token
      localStorage.setItem("skillmatch_token", res.data.token);

      // Save user info (same key your existing app uses)
      localStorage.setItem("reactproject", JSON.stringify({
        username: res.data.user.username,
        email: inputvalue.email,
        role: res.data.user.role
      }));

      toast.success(`Welcome Back ${res.data.user.username} 👋`, {
        position: "top-center"
      });

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Login failed",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Login to access your dashboard
        </p>

        <form onSubmit={handlesubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            onChange={handlechange}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <input
            type="password"
            name="password"
            onChange={handlechange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;