import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const Register = () => {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    role: ""          // "candidate" or "company"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  // Role select button handler
  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formdata, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.role) {
      toast.error("Please select Candidate or Company", { position: "top-center" });
      return;
    }

    try {
      const res = await api.post(
        "/api/auth/register",
        formdata
      );

      // Save to localStorage (same key your app uses)
      localStorage.setItem("reactproject", JSON.stringify({
        username: res.data.user.username,
        email: formdata.email,
        number: formdata.number,
        password: formdata.password,
        role: res.data.user.role
      }));

      toast.success("Registration Successful! 🎉", { position: "top-center" });
      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration failed",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Sign up to access job opportunities
        </p>

        {/* Role Selection - Candidate or Company */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3 font-medium text-center">
            I am registering as a
          </p>
          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => handleRoleSelect("candidate")}
              className={`flex-1 py-3 rounded-md border text-sm font-medium transition flex items-center justify-center gap-2
                ${formdata.role === "candidate"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
            >
              👤 Candidate
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("company")}
              className={`flex-1 py-3 rounded-md border text-sm font-medium transition flex items-center justify-center gap-2
                ${formdata.role === "company"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
            >
              🏢 Company
            </button>

          </div>

          {/* Show selected role */}
          {formdata.role && (
            <p className="text-center text-xs text-gray-500 mt-2">
              Registering as:{" "}
              <span className="font-semibold text-black capitalize">
                {formdata.role}
              </span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder={formdata.role === "company" ? "Company Name" : "Full Name"}
            name="username"
            value={formdata.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            name="number"
            value={formdata.number}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:opacity-90 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;