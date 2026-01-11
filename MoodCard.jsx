import { motion } from "framer-motion";

export default function MoodCard({ mood, emoji, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer p-6 rounded-2xl shadow-xl ${color}`}
      onClick={() => onClick(mood)}
    >
      <h2 className="text-2xl font-bold">{emoji}</h2>
      <p className="mt-2 text-lg capitalize">{mood}</p>
    </motion.div>
  );
}