// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Login successful! (Demo mode)");
      navigate("/dashboard");
    }, 800);
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Logged in:", data);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        const error = await response.json();
        alert(`⚠️ Login failed: ${error.detail}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to connect to backend.");
    }
  };


  return (
    <div className="min-h-screen bg-navy-900 dark:bg-navy-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ✅ Card shakes on hover */}
        <div className="bg-navy-800 dark:bg-navy-200 rounded-2xl shadow-xl p-8 border border-navy-700 dark:border-navy-300 hover:animate-shake transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white dark:text-navy-900">
              Sign In to Your Account
            </h1>
            <p className="text-gray-400 dark:text-navy-600 mt-2">
              Access your certified documents securely
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300 dark:text-navy-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-accent-400 hover:text-accent-300"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            {/* ✅ Submit button shakes on hover */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white font-semibold rounded-lg transition shadow-md hover:animate-shake"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 dark:text-navy-600">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-accent-400 hover:text-accent-300 font-medium"
              >
                Create Free Account
              </button>
            </p>
          </div>
        </div>

        {/* ✅ Back to Home button shakes on hover */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 px-4 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 hover:animate-shake transition shadow-md"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
