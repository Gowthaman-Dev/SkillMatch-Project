import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputvalue, setInputValue] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(inputvalue.email),
      password: validatePassword(inputvalue.password)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    let errorMsg = "";
    if (field === "email") errorMsg = validateEmail(inputvalue.email);
    if (field === "password") errorMsg = validatePassword(inputvalue.password);
    setErrors({ ...errors, [field]: errorMsg });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting", { position: "top-center" });
      return;
    }

    try {
      const res = await api.post("/api/auth/login", inputvalue);

      localStorage.setItem("skillmatch_token", res.data.token);
      localStorage.setItem("reactproject", JSON.stringify({
        username: res.data.user.username,
        email: inputvalue.email,
        role: res.data.user.role
      }));

      toast.success(`Welcome Back ${res.data.user.username} 👋`, { position: "top-center" });
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed", { position: "top-center" });
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
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={inputvalue.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="Email Address"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.email && errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={inputvalue.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              placeholder="Password"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.password && errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

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