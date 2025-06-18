// src/pages/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white font-sans">
      <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">InstPost AI</h1>
        <Link to="/dashboard" className="bg-white text-purple-600 font-medium px-4 py-2 rounded-full hover:scale-105 transition">
          Try Now
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20 px-6"
      >
        <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          AI-Powered <br /> Instagram Captions & Hashtags
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Generate viral captions and hashtags instantly using AI. Perfect for creators, influencers, and businesses.
        </p>
        <Link to="/dashboard">
          <button className="mt-8 bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition">
            Generate Now — Free!
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-20 px-6"
      >
        <h3 className="text-3xl font-bold mb-6 text-center">Why InstPost AI?</h3>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Save Time", "Boost Engagement", "Stay on Trend"].map((item, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-md shadow-lg">
              <h4 className="text-xl font-semibold">{item}</h4>
              <p className="mt-2 text-sm">Let AI do the hard work. Focus on creating, not guessing hashtags.</p>
            </div>
          ))}
        </div>
      </motion.div>

      <footer className="mt-20 text-center text-sm text-white/70 py-6">
        &copy; {new Date().getFullYear()} InstPost AI — Built for creators.
      </footer>
    </div>
  );
};

export default Landing;
