"use client";

import { motion } from "framer-motion";

interface TopScreenProps {
  onStart: () => void;
}

const floatingIcons = ["📚", "🧠", "⚗️", "🔭", "🎨", "📐", "⚡", "💡"];

export default function TopScreen({ onStart }: TopScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      {/* Floating emoji icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20 select-none pointer-events-none"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${15 + Math.floor(i / 4) * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {icon}
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 tracking-widest uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          16タイプ学習スタイル診断
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl font-bold leading-tight mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          あなたの
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            学習OS
          </span>
          を
          <br />
          発見しよう
        </motion.h1>

        <motion.p
          className="text-sm text-white/50 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          30問の質問で、あなたの学習スタイルを16タイプの歴史的偉人キャラクターに診断。
          <br />
          あなたは誰と同じ学習OSを持っている？
        </motion.p>

        {/* Type cards preview */}
        <motion.div
          className="flex justify-center gap-2 mb-8 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { label: "P/S", desc: "集中スイッチ" },
            { label: "L/C", desc: "理解の入り口" },
            { label: "R/B", desc: "進行スタイル" },
            { label: "T/I", desc: "記憶の回路" },
          ].map((axis) => (
            <div
              key={axis.label}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-center"
            >
              <div className="text-xs font-bold text-violet-300">{axis.label}</div>
              <div className="text-[10px] text-white/40">{axis.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="relative w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-white overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 50%, #2563eb 100%)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 50%, #3b82f6 100%)",
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">診断スタート</span>
          <motion.span
            className="relative z-10 text-lg"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>

        <motion.p
          className="mt-4 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          所要時間：約5分 / 全30問
        </motion.p>
      </motion.div>
    </div>
  );
}
