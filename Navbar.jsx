import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../services/firebase";

export default function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md rounded-xl mb-6"
    >
      {/* App Name */}
      <h1 className="text-xl font-bold text-white">
        🎧 MoodSync
      </h1>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="User"
            className="w-9 h-9 rounded-full border border-white"
          />
        )}

        <span className="text-sm text-white hidden sm:block">
          {user?.displayName}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </motion.nav>
  );
}
