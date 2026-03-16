"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const analyzeMessages = [
  "回答データを解析中...",
  "学習パターンを照合中...",
  "歴史的偉人と比較中...",
  "あなたの勉強タイプを特定中...",
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg)]">

      {/* タイプコードアニメーション */}
      <div className="relative w-48 h-48 mb-10">
        {/* 回転リング */}
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-transparent"
          style={{ borderTopColor: "#1A1A1A", borderRightColor: "#1A1A1A" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-[3px] border-transparent"
          style={{ borderBottomColor: "var(--yellow)", borderLeftColor: "var(--yellow)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* 軸グリフ */}
        {glyphs.map((glyph, i) => {
          const angle = (i / glyphs.length) * 360;
          const radius = 76;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return (
            <motion.div
              key={glyph}
              className="absolute text-xs font-black"
              style={{
                left: "50%", top: "50%",
                x: x - 8, y: y - 8,
                color: i % 2 === 0 ? "#1A1A1A" : "#7A7060",
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            >
              {glyph}
            </motion.div>
          );
        })}

        {/* 中央テキスト */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-outline text-3xl font-black tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ????
          </motion.div>
        </div>
      </div>

      {/* タイトル */}
      <motion.h2
        className="text-xl font-black text-center mb-2 text-[var(--fg)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        あなたの勉強タイプを
        <br />
        <span className="inline-block bg-[var(--yellow)] px-2">解析中...</span>
      </motion.h2>

      {/* 動くメッセージ */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="text-sm text-[var(--muted)] mb-10 text-center mt-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {analyzeMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* プログレスバー */}
      <div className="w-56 h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[var(--fg)]"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 4軸バッジ */}
      <div className="mt-10 grid grid-cols-4 gap-2">
        {["P/S", "L/C", "R/B", "T/I"].map((label, i) => (
          <motion.div
            key={label}
            className="px-3 py-2 rounded-xl bg-white border border-[var(--border)] text-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="text-xs font-black text-[var(--fg)]">{label}</div>
            <div className="text-[9px] text-[var(--muted)] mt-0.5">解析中</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
