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
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Validation functions
  const validateUsername = (name) => {
    if (!name) return "Username is required";
    if (name.length < 3) return "Username must be at least 3 characters";
    if (name.length > 50) return "Username cannot exceed 50 characters";
    if (!/^[a-zA-Z0-9\s]+$/.test(name)) return "Username can only contain letters, numbers and spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address (e.g., name@example.com)";
    return "";
  };

  const validatePhone = (number) => {
    if (!number) return "Phone number is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) return "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 30) return "Password cannot exceed 30 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return "";
  };

  const validateRole = (role) => {
    if (!role) return "Please select a role (Candidate or Company)";
    return "";
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {
      username: validateUsername(formdata.username),
      email: validateEmail(formdata.email),
      number: validatePhone(formdata.number),
      password: validatePassword(formdata.password),
      role: validateRole(formdata.role)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    
    let errorMsg = "";
    switch (field) {
      case "username": errorMsg = validateUsername(formdata.username); break;
      case "email": errorMsg = validateEmail(formdata.email); break;
      case "number": errorMsg = validatePhone(formdata.number); break;
      case "password": errorMsg = validatePassword(formdata.password); break;
      case "role": errorMsg = validateRole(formdata.role); break;
      default: break;
    }
    setErrors({ ...errors, [field]: errorMsg });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formdata, role: selectedRole });
    setErrors({ ...errors, role: "" });
    setTouched({ ...touched, role: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = { username: true, email: true, number: true, password: true, role: true };
    setTouched(allTouched);
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting", { position: "top-center" });
      return;
    }

    try {
      const res = await api.post("/api/auth/register", formdata);

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
      const errorMsg = error.response?.data?.msg || "Registration failed";
      console.error("Register error:", error.response?.status, error.response?.data);
      toast.error(errorMsg, { position: "top-center" });
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

        {/* Role Selection */}
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
          {touched.role && errors.role && (
            <p className="text-red-500 text-xs mt-2 text-center">{errors.role}</p>
          )}
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
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder={formdata.role === "company" ? "Company Name" : "Full Name"}
              name="username"
              value={formdata.username}
              onChange={handleChange}
              onBlur={() => handleBlur("username")}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.username && errors.username ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.email && errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="tel"
              placeholder="Mobile Number (10 digits)"
              name="number"
              value={formdata.number}
              onChange={handleChange}
              onBlur={() => handleBlur("number")}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.number && errors.number ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.number && errors.number && (
              <p className="text-red-500 text-xs mt-1">{errors.number}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-black transition
                ${touched.password && errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            {touched.password && !errors.password && formdata.password && (
              <p className="text-green-500 text-xs mt-1">✓ Strong password</p>
            )}
          </div>

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