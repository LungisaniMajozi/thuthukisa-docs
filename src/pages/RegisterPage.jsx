// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const calculateLuhnChecksum = (idWithoutChecksum) => {
  let sum = 0;
  for (let i = 0; i < idWithoutChecksum.length; i++) {
    let digit = parseInt(idWithoutChecksum[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return (10 - (sum % 10)) % 10;
};

const validateSAID = (id) => {
  if (!/^\d{13}$/.test(id)) return "ID must be exactly 13 digits";
  const YY = parseInt(id.substring(0, 2), 10);
  const MM = parseInt(id.substring(2, 4), 10);
  const DD = parseInt(id.substring(4, 6), 10);
  const SSSS = parseInt(id.substring(6, 10), 10);
  const C = parseInt(id.substring(10, 11), 10);
  const Z = parseInt(id.substring(12, 13), 10);

  const currentYear = new Date().getFullYear() % 100;
  let year = YY <= currentYear + 10 ? 2000 + YY : 1900 + YY;
  const date = new Date(year, MM - 1, DD);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== MM ||
    date.getDate() !== DD ||
    MM < 1 ||
    MM > 12 ||
    DD < 1 ||
    DD > 31
  ) {
    return "Invalid date of birth in ID";
  }

  if (SSSS < 0 || SSSS > 9999) return "Invalid gender code";
  if (C !== 0 && C !== 1) return "Citizenship digit must be 0 or 1";
  const expected = calculateLuhnChecksum(id.substring(0, 12));
  if (Z !== expected) return "Invalid ID checksum";

  return null;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "idNumber") newValue = value.replace(/\D/g, "").slice(0, 13);
    setFormData({ ...formData, [name]: newValue });
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim() ? "" : "Full name is required";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Valid email is required";
      case "idNumber":
        return validateSAID(value) || "";
      case "password":
        if (value.length < 8) return "At least 8 characters";
        if (!/[A-Z]/.test(value)) return "One uppercase letter";
        if (!/[a-z]/.test(value)) return "One lowercase letter";
        if (!/\d/.test(value)) return "One number";
        if (!/[^A-Za-z0-9]/.test(value)) return "One special character";
        return "";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const [errors, setErrors] = useState({});
  const isFormValid = () =>
    !errors.fullName &&
    !errors.email &&
    !errors.idNumber &&
    !errors.password &&
    !errors.confirmPassword &&
    formData.fullName.trim() &&
    formData.email &&
    formData.idNumber &&
    formData.password &&
    formData.confirmPassword;

  const getStrengthColor = () => {
    if (!formData.password) return "bg-gray-200";
    const checks = [
      formData.password.length >= 8,
      /[A-Z]/.test(formData.password),
      /[a-z]/.test(formData.password),
      /\d/.test(formData.password),
      /[^A-Za-z0-9]/.test(formData.password),
    ].filter(Boolean).length;
    if (checks >= 4) return "bg-green-500";
    if (checks >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Account created successfully! (Demo mode)");
      navigate("/dashboard");
    }, 800);
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          id_number: formData.idNumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Registered user:", data);
        alert("Account created successfully!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`⚠️ Registration failed: ${errorData.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to connect to the server. Please check your backend.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-navy-900 dark:bg-navy-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ✅ Card shakes on hover */}
        <div className="bg-navy-800 dark:bg-navy-200 rounded-2xl shadow-xl p-8 border border-navy-700 dark:border-navy-300 hover:animate-shake transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white dark:text-navy-900">
              Create Your Account
            </h1>
            <p className="text-gray-400 dark:text-navy-600 mt-2">
              Join Thuthukisa Docs to manage your certified documents
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="e.g. Lungisani Majozi"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
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
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                South African ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.idNumber
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="e.g. 0301255184089"
                maxLength="13"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.idNumber}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-navy-500">
                Format: YYMMDDSSSSCAZ (13 digits)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="••••••••"
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {errors.password || "Strong password"}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-navy-700 dark:bg-navy-100 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-navy-600 dark:border-navy-300"
                } rounded-lg text-white dark:text-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* ✅ Submit button shakes on hover */}
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 px-4 font-semibold rounded-lg transition shadow-md hover:animate-shake ${
                isFormValid() && !isSubmitting
                  ? "bg-accent-600 hover:bg-accent-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 dark:text-navy-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-accent-400 hover:text-accent-300 font-medium"
              >
                Sign In
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

export default RegisterPage;
