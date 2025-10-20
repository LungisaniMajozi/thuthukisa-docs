// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setErrors({ email: error });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-navy-900 dark:bg-navy-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ✅ Card shakes on hover */}
        <div className="bg-navy-800 dark:bg-navy-200 rounded-2xl shadow-xl p-8 border border-navy-700 dark:border-navy-300 hover:animate-shake transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white dark:text-navy-900">
              Reset Your Password
            </h1>
            {success ? (
              <p className="text-green-400 mt-2">
                ✅ Password reset link sent! Check your email.
              </p>
            ) : (
              <p className="text-gray-400 dark:text-navy-600 mt-2">
                Enter your email and we’ll send you a link to reset your
                password.
              </p>
            )}
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-navy-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({});
                  }}
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
              {/* ✅ Submit button shakes on hover */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white font-semibold rounded-lg transition shadow-md hover:animate-shake"
              >
                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition hover:animate-shake"
              >
                Back to Sign In
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 dark:text-navy-600">
              Remember your password?{" "}
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

export default ForgotPasswordPage;
