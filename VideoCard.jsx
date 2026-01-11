import { motion } from "framer-motion";

export default function VideoCard({ video }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 rounded-xl p-4 shadow-lg"
    >
      <iframe
        className="w-full rounded-lg"
        height="200"
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title={video.snippet.title}
        allowFullScreen
      ></iframe>

      <p className="mt-3 font-semibold text-white text-sm">
        {video.snippet.title}
      </p>
    </motion.div>
  );
}
