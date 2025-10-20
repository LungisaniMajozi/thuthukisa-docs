// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [currentIcon, setCurrentIcon] = useState("📄");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => {
        const icons = ["📄", "🆔", "🖨️", "🔒"];
        const currentIndex = icons.indexOf(prev);
        return icons[(currentIndex + 1) % icons.length];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 dark:bg-navy-50 text-white dark:text-navy-900 font-sans">
      <header className="bg-navy-800 dark:bg-navy-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-accent-400 dark:text-accent-600">
            Thuthukisa Docs
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-navy-700 dark:hover:bg-navy-200"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-navy-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-navy-700 dark:text-navy-900 font-medium hover:text-accent-600 dark:hover:text-accent-400"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="ml-2 px-4 py-2 bg-accent-600 text-white dark:bg-accent-500 dark:text-navy-900 rounded-md font-medium hover:bg-accent-700 dark:hover:bg-accent-600 transition"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="min-h-screen flex items-center justify-center bg-navy-800 dark:bg-navy-100 p-4">
          <div
            className={`bg-navy-700 dark:bg-navy-200 rounded-2xl shadow-2xl p-8 max-w-3xl w-full text-center border border-navy-600 dark:border-navy-300 transition-all duration-300 hover:animate-liquid hover:animate-pulseGlow`}
          >
            <div className="text-5xl mb-6">{currentIcon}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-navy-900 mb-6">
              Simplify Document Certification in South Africa
            </h1>
            <p className="text-lg text-gray-300 dark:text-navy-600 mb-8">
              Thuthukisa Docs helps you manage certified copies of IDs, matric
              certificates, and birth certificates—track expiry dates, receive
              renewal reminders, and reduce unnecessary visits to SAPS or Home
              Affairs.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-accent-600 text-white dark:bg-accent-500 dark:text-navy-900 font-semibold rounded-lg hover:bg-accent-700 dark:hover:bg-accent-600 transition shadow-md inline-block"
            >
              Create Free Account
            </button>
            <p className="mt-4 text-sm text-gray-400 dark:text-navy-500">
              No credit card required • Secure & compliant
            </p>
          </div>
        </section>

        <section className="py-16 bg-navy-800 dark:bg-navy-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white dark:text-navy-900">
                The Problem
              </h2>
              <p className="text-gray-300 dark:text-navy-600 mt-4">
                In South Africa, even if your ID or matric certificate hasn’t
                changed, your{" "}
                <strong>certified copy expires every 3 months</strong>.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-accent-500 dark:border-accent-400 p-6 rounded-r-lg">
              <h3 className="font-bold text-accent-600 dark:text-accent-400 text-lg mb-2">
                Every 3 months, you must:
              </h3>
              <ul className="list-disc pl-5 text-gray-300 dark:text-navy-600 space-y-1">
                <li>Queue for hours at police stations or Home Affairs</li>
                <li>Pay for transport and printing</li>
                <li>Risk losing or damaging your documents</li>
                <li>Repeat the same process—even for unchanged documents</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy-900 dark:bg-navy-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white dark:text-navy-900">
                How It Works
              </h2>
              <p className="text-gray-300 dark:text-navy-600 mt-4">
                Simple steps to manage your certified documents digitally.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "upload",
                  title: "Upload Documents",
                  icon: "📁",
                  shortDesc: "Submit original + certified copy.",
                },
                {
                  id: "track",
                  title: "Track Expiry",
                  icon: "📅",
                  shortDesc: "We track 3-month validity.",
                },
                {
                  id: "renew",
                  title: "Renew Smartly",
                  icon: "🔄",
                  shortDesc: "Update only the stamp.",
                },
              ].map((item, i) => (
                <div
                  key={item.id}
                  className={`bg-navy-800 dark:bg-navy-200 rounded-xl shadow-md p-6 transition-all duration-300 border border-navy-700 dark:border-navy-300 hover:animate-liquid hover:animate-pulseGlow`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-white dark:text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 dark:text-navy-600">
                    {item.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy-800 dark:bg-navy-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-white dark:text-navy-900 text-center mb-12">
              Key Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: "time",
                  title: "Save Time",
                  desc: "No more standing in long queues every 3 months.",
                  icon: "⏱️",
                },
                {
                  id: "alerts",
                  title: "Never Miss Expiry",
                  desc: "Get SMS and email alerts 7 days before your certification expires.",
                  icon: "🔔",
                },
                {
                  id: "secure",
                  title: "Secure Storage",
                  desc: "Military-grade encryption keeps your documents safe and private.",
                  icon: "🔒",
                },
                {
                  id: "renew",
                  title: "Renew Faster",
                  desc: "Update only the stamp—not the whole document—when re-certifying.",
                  icon: "🔄",
                },
              ].map((item, i) => (
                <div
                  key={item.id}
                  className={`bg-navy-800 dark:bg-navy-200 rounded-xl shadow-md p-6 transition-all duration-300 border border-navy-700 dark:border-navy-300 hover:animate-liquid hover:animate-pulseGlow`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-white dark:text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 dark:text-navy-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy-900 dark:bg-navy-50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-navy-900">
              Ready to Simplify Your Life?
            </h2>
            <p className="mb-8 opacity-90 text-gray-300 dark:text-navy-600">
              Join thousands of South Africans saving time and stress with
              digital document management.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-accent-600 text-white dark:bg-accent-500 dark:text-navy-900 font-bold rounded-lg hover:bg-accent-700 dark:hover:bg-accent-600 transition shadow-md inline-block"
            >
              Start Your Free Account
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-navy-900 dark:bg-navy-100 text-gray-400 dark:text-navy-500 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Thuthukisa Docs</p>
          <p className="mt-2 text-sm">
            A digital management tool for certified documents in South Africa.
            Not a government service.
          </p>
          <p className="mt-1 text-xs opacity-75">
            “Thuthukisa” means “to uplift” — because your time and dignity
            matter.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
