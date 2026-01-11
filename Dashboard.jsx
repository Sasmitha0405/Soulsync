import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Mic,
  MicOff,
  Sparkles,
  Music,
  Heart,
  Zap,
  Moon,
  Sun,
  Flame,
  CloudRain,
} from "lucide-react";

import { auth } from "../services/firebase";
import { analyzeMood } from "../services/gemini";
import { fetchSongs } from "../services/youtube";

import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

/* 🎨 Pastel Mood Config – Soft & Dreamy */
const moodConfig = {
  happy: { bg: "from-yellow-200 to-amber-200", accent: "from-yellow-300 to-amber-300", glow: "#fde047", icon: <Sun className="w-12 h-12" /> },
  sad: { bg: "from-blue-200 to-indigo-200", accent: "from-blue-300 to-indigo-300", glow: "#93c5fd", icon: <CloudRain className="w-12 h-12" /> },
  angry: { bg: "from-rose-200 to-red-200", accent: "from-rose-300 to-red-300", glow: "#fca5a5", icon: <Flame className="w-12 h-12" /> },
  calm: { bg: "from-teal-200 to-emerald-200", accent: "from-teal-300 to-emerald-300", glow: "#5eead4", icon: <Moon className="w-12 h-12" /> },
  energetic: { bg: "from-orange-200 to-pink-200", accent: "from-orange-300 to-pink-300", glow: "#fbbf24", icon: <Zap className="w-12 h-12" /> },
  romantic: { bg: "from-pink-200 to-rose-200", accent: "from-pink-300 to-rose-300", glow: "#f9a8d4", icon: <Heart className="w-12 h-12" /> },
  motivation: { bg: "from-purple-200 to-violet-200", accent: "from-purple-300 to-violet-300", glow: "#c4b5fd", icon: <Sparkles className="w-12 h-12" /> },
  neutral: { bg: "from-gray-100 to-slate-100", accent: "from-gray-200 to-slate-200", glow: "#e2e8f0", icon: <Music className="w-12 h-12" /> },
};

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  /* Speech Recognition Setup - UNCHANGED */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
      setTimeout(() => {
        handleAnalyze(spokenText);
      }, 300);
    };
    recognition.onerror = (err) => {
      console.error("Voice error:", err);
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  /* Analyze Mood - UNCHANGED */
  const handleAnalyze = async (inputText = text) => {
    if (!inputText.trim()) return;

    try {
      setLoading(true);
      const detectedMood = await analyzeMood(inputText);
      setMood(detectedMood);

      const songs = await fetchSongs(detectedMood);
      setVideos(songs);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentMood = moodConfig[mood] || moodConfig.neutral;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Full Screen Pastel Gradient Background */}
      <div
        className="min-h-screen flex flex-col"
        style={{
          fontFamily: "'Inter', sans-serif",
          background: `linear-gradient(135deg, #fdf2f8, #f0f9ff)`,
        }}
      >
        {/* Mood Overlay */}
        <div
          className="fixed inset-0 opacity-60 transition-all duration-1000"
          style={{
            background: `linear-gradient(135deg, ${currentMood.bg})`,
          }}
        />

        {/* Centered Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl">
            <Navbar user={user} />

            {/* Main Glassmorphic Card – Perfectly Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 backdrop-blur-xl bg-white/60 border border-white/50 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Soft Glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-40 -z-10"
                style={{ background: currentMood.glow }}
              />

              <div className="p-10 md:p-16 text-center">
                {/* Title */}
                <motion.h1
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-7xl font-extrabold tracking-tight"
                  style={{
                    background: "linear-gradient(to right, #a78bfa, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Soulsync
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-700 font-medium mt-4"
                >
                  Let your mood guide the music ♪
                </motion.p>

                {/* Input Area */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 max-w-2xl mx-auto"
                >
                  <label className="block text-left text-gray-800 text-lg font-semibold mb-4">
                    How are you feeling today?
                  </label>

                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Share your thoughts, feelings, or speak your heart out..."
                      rows={6}
                      className="w-full p-6 rounded-2xl bg-white/70 backdrop-blur border border-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300/50 resize-none text-lg"
                    />

                    {/* Cute Pastel Mic Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => recognitionRef.current?.start()}
                      className={`absolute bottom-5 right-5 px-8 py-5 rounded-2xl flex items-center gap-3 shadow-lg font-bold text-white transition-all ${
                        listening
                          ? "bg-rose-400 animate-pulse"
                          : "bg-gradient-to-r from-purple-400 to-pink-400 hover:shadow-xl hover:shadow-pink-300/50"
                      }`}
                    >
                      {listening ? (
                        <>
                          <MicOff className="w-7 h-7" />
                          Listening...
                        </>
                      ) : (
                        <>
                          <Mic className="w-7 h-7" />
                          Speak
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Beautiful Sync Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12"
                >
                  <button
                    onClick={() => handleAnalyze()}
                    disabled={loading || !text.trim()}
                    className="px-16 py-6 rounded-full text-white text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:shadow-2xl hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Syncing Your Vibe..." : "Sync My Music"}
                  </button>
                </motion.div>

                {/* Loader */}
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-16"
                    >
                      <Loader text="Reading your heart & finding the perfect songs ✨" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mood Reveal – Soft & Elegant */}
                <AnimatePresence>
                  {mood && !loading && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="mt-20"
                    >
                      <p className="text-gray-700 text-xl font-medium mb-6">
                        Your current mood
                      </p>
                      <div className="inline-flex flex-col items-center gap-8 bg-white/70 backdrop-blur-lg px-16 py-10 rounded-3xl border border-white/60 shadow-xl">
                        <div className="p-8 rounded-full bg-gradient-to-br from-white to-white/50">
                          {currentMood.icon}
                        </div>
                        <p className="text-5xl font-extrabold text-gray-800 capitalize">
                          {mood}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Songs Grid */}
                <AnimatePresence>
                  {videos.length > 0 && !loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-20"
                    >
                      <h2 className="text-4xl font-bold text-gray-800 mb-12">
                        Curated with love for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{mood}</span> mood
                      </h2>

                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
                        }}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-10"
                      >
                        {videos.map((video) => (
                          <motion.div
                            key={video.id.videoId}
                            variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                          >
                            <VideoCard video={video} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 