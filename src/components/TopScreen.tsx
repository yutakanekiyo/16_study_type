"use client";

import { motion } from "framer-motion";

interface TopScreenProps {
  onStart: () => void;
}

const floatingIcons = ["📚", "🧠", "⚗️", "🔭", "🎨", "📐", "⚡", "💡"];

const axes = [
  { label: "P / S", desc: "集中スイッチ", detail: "一人 vs みんなと" },
  { label: "L / C", desc: "理解の入り口", detail: "論理 vs 文脈" },
  { label: "R / B", desc: "進行スタイル", detail: "習慣 vs 瞬発" },
  { label: "T / I", desc: "記憶の回路", detail: "テキスト vs イメージ" },
];

export default function TopScreen({ onStart }: TopScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl" />
      </div>

      {/* Floating emoji icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20 select-none pointer-events-none"
          style={{
            left: `${8 + (i % 4) * 25}%`,
            top: `${12 + Math.floor(i / 4) * 65}%`,
          }}
          animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-20">

          {/* ===== 左カラム / スマホでは全体 ===== */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-violet-200 bg-white text-xs text-violet-600 tracking-widest uppercase shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              16タイプ学習スタイル診断
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight text-[#1e1b4b]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              あなたの
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                学習OS
              </span>
              を
              <br />
              発見しよう
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-[#6b7280] mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              30問の質問で、あなたの学習スタイルを
              <br />
              16タイプの歴史的偉人キャラクターに診断。
            </motion.p>

            {/* 軸カード（スマホのみ表示） */}
            <motion.div
              className="flex md:hidden justify-center gap-2 mb-8 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {axes.map((axis) => (
                <div
                  key={axis.label}
                  className="px-3 py-1.5 rounded-xl bg-white border border-violet-100 text-center shadow-sm"
                >
                  <div className="text-xs font-bold text-violet-600">{axis.label}</div>
                  <div className="text-[10px] text-[#9ca3af]">{axis.desc}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onStart}
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-semibold text-base text-white cursor-pointer shadow-lg w-full max-w-xs md:w-auto"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(109,40,217,0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span>診断スタート</span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            <motion.p
              className="mt-4 text-xs text-[#9ca3af]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              所要時間：約5分 / 全30問
            </motion.p>
          </div>

          {/* ===== 右カラム（デスクトップのみ） ===== */}
          <motion.div
            className="hidden md:flex flex-1 flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {/* 軸カード 2×2グリッド */}
            <div className="grid grid-cols-2 gap-3">
              {axes.map((axis, i) => (
                <motion.div
                  key={axis.label}
                  className="p-5 rounded-2xl bg-white border border-violet-100 shadow-sm"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(109,40,217,0.12)" }}
                >
                  <div className="text-lg font-bold text-violet-600 mb-1">{axis.label}</div>
                  <div className="text-sm font-semibold text-[#1e1b4b] mb-0.5">{axis.desc}</div>
                  <div className="text-xs text-[#9ca3af]">{axis.detail}</div>
                </motion.div>
              ))}
            </div>

            {/* 診断数 */}
            <motion.div
              className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-center shadow-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="text-4xl font-bold mb-1">16</div>
              <div className="text-sm text-white/80">種類の学習タイプ</div>
              <div className="text-xs text-white/50 mt-2">歴史的偉人キャラクターに対応</div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
