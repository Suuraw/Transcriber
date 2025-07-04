"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MagicSparkleLoaderProps {
  isLoading: boolean;
}

export default function MagicSparkleLoader({
  isLoading,
}: MagicSparkleLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3, // Quick fade in
            exit: { duration: 2.5, ease: "easeOut" }, // Slow, gentle fade out
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 bg-white/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              exit: { duration: 2.5, ease: "easeOut" },
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              exit: { duration: 2.5, ease: "easeOut" },
            }}
            className="relative w-80 h-80"
          >
            {/* Sparkles */}
            {[...Array(25)].map((_, i) => {
              const randomX = Math.random() * 100;
              const randomY = Math.random() * 100;
              const randomDelay = Math.random() * 2;
              const randomDuration = 1 + Math.random() * 2;
              const randomSize = 8 + Math.random() * 16;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: { duration: 2.5, ease: "easeOut" },
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: randomDelay,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-black transform -translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                  </div>
                </motion.div>
              );
            })}

            {/* Twinkling Dots */}
            {[...Array(15)].map((_, i) => {
              const randomX = Math.random() * 100;
              const randomY = Math.random() * 100;
              const randomDelay = Math.random() * 3;
              const randomDuration = 0.5 + Math.random() * 1.5;

              return (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute w-1 h-1 bg-black rounded-full"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 2.5, ease: "easeOut" },
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: randomDelay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
