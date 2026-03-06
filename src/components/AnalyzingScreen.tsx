"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const analyzeMessages = [
  "回答データを収集中...",
  "学習パターンを解析中...",
  "歴史的偉人データベースと照合中...",
  "あなたの学習OSを特定中...",
  "結果を生成中...",
];

const glyphs = ["P", "S", "L", "C", "R", "B", "T", "I"];

export default function AnalyzingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, analyzeMessages.length - 1));
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Animated ring */}
      <div className="relative w-48 h-48 mb-10">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "#818cf8",
            borderRightColor: "#818cf8",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle rotating ring (reverse) */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent"
          style={{
            borderBottomColor: "#34d399",
            borderLeftColor: "#34d399",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(99,102,241,0.1) 100%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting glyphs */}
        {glyphs.map((glyph, i) => {
          const angle = (i / glyphs.length) * 360;
          const radius = 76;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={glyph}
              className="absolute text-xs font-bold"
              style={{
                left: "50%",
                top: "50%",
                x: x - 8,
                y: y - 8,
                color: i % 2 === 0 ? "#818cf8" : "#34d399",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            >
              {glyph}
            </motion.div>
          );
        })}

        {/* Center brain emoji */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🧠
        </motion.div>
      </div>

      {/* Main message */}
      <motion.h2
        className="text-xl font-semibold text-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        あなたの学習OSを
        <br />
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          解析中...
        </span>
      </motion.h2>

      {/* Changing sub-messages */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="text-sm text-white/40 mb-10 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {analyzeMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Scanning bar animation */}
      <div className="w-56 h-0.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #818cf8, #34d399, transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating data points */}
      <div className="mt-10 grid grid-cols-4 gap-3">
        {[
          { label: "P/S", value: "解析中" },
          { label: "L/C", value: "解析中" },
          { label: "R/B", value: "解析中" },
          { label: "T/I", value: "解析中" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-center"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="text-xs font-bold text-violet-300">{item.label}</div>
            <div className="text-[10px] text-white/30 mt-0.5">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
