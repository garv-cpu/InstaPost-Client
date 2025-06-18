import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ added

  const generatePost = async () => {
    if (!input.trim()) return;

    setLoading(true); // ✅ start loading

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setCaption(data.result.caption || "");
      setHashtags(data.result.hashtags || []);
    } catch (err) {
      toast.error("Something went wrong while generating content.");
      console.error(err);
    }

    setLoading(false); // ✅ stop loading
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${caption}\n\n${hashtags.join(" ")}`);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6 sm:p-10 font-sans">
      <header className="mb-12 flex justify-between items-center">
        <h1 className="text-3xl font-bold">InstPost AI Dashboard 🚀</h1>
        <Link
          to="/"
          className="bg-white text-purple-600 px-4 py-2 rounded-full hover:scale-105 transition"
        >
          Home
        </Link>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Enter a keyword or topic
        </h2>

        <input
          type="text"
          className="w-full rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60"
          placeholder="e.g. fashion, fitness, business tips"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={generatePost}
          disabled={loading} // ✅ disable while loading
          className="mt-6 w-full bg-white text-purple-600 font-medium py-3 rounded-full hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Captions & Hashtags"}{" "}
          {/* ✅ show text */}
        </button>

        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Generated Caption</h3>
              <p className="bg-white/20 p-4 rounded-md text-white/90">
                {caption}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Top Hashtags</h3>
              <div className="flex flex-wrap gap-2 bg-white/20 p-4 rounded-md">
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/80 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-full"
            >
              Copy to Clipboard
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
