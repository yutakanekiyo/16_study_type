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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f5f3ff]">
      {/* Animated ring */}
      <div className="relative w-48 h-48 mb-10">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "#7c3aed", borderRightColor: "#7c3aed" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent"
          style={{ borderBottomColor: "#4f46e5", borderLeftColor: "#4f46e5" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-10 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(99,102,241,0.05) 100%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

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
                left: "50%", top: "50%",
                x: x - 8, y: y - 8,
                color: i % 2 === 0 ? "#6d28d9" : "#4f46e5",
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            >
              {glyph}
            </motion.div>
          );
        })}

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🧠
        </motion.div>
      </div>

      <motion.h2
        className="text-xl font-semibold text-center mb-3 text-[#1e1b4b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        あなたの学習OSを
        <br />
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          解析中...
        </span>
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="text-sm text-[#9ca3af] mb-10 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {analyzeMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="w-56 h-1.5 bg-[#ede9fe] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #7c3aed, #4f46e5, transparent)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mt-10 grid grid-cols-4 gap-3">
        {["P/S", "L/C", "R/B", "T/I"].map((label, i) => (
          <motion.div
            key={label}
            className="px-3 py-2 rounded-xl bg-white border border-[#e4e0f7] text-center shadow-sm"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="text-xs font-bold text-violet-600">{label}</div>
            <div className="text-[10px] text-[#9ca3af] mt-0.5">解析中</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
