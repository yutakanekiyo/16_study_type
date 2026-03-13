"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import resultsData from "@/data/results.json";

type ResultType = {
  code: string;
  name: string;
  emoji: string;
  era: string;
  tagline: string;
  color: string;
  accentColor: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" as const } },
};

const AXIS_LABELS = [
  { key: "集中スイッチ", a: "P（Public）", b: "S（Solitude）" },
  { key: "理解の入り口", a: "L（Logical）", b: "C（Contextual）" },
  { key: "進行スタイル", a: "R（Routine）", b: "B（Burst）" },
  { key: "記憶の回路",   a: "T（Textual）", b: "I（Imagery）" },
];

export default function TypesListPage() {
  const types = Object.values(resultsData.types) as ResultType[];

  return (
    <div className="min-h-screen bg-[#f5f3ff] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-64 rounded-full blur-3xl opacity-20 pointer-events-none bg-violet-500" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 pb-20">

        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-white text-xs text-violet-600 tracking-widest uppercase shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            全16タイプ
          </span>
          <h1 className="text-2xl font-bold text-[#1e1b4b] mb-2">勉強タイプ一覧</h1>
          <p className="text-sm text-[#6b7280] leading-relaxed">
            4つの軸から導かれる、16人の歴史的偉人タイプ。<br className="hidden sm:inline" />
            あなたの学習スタイルはどれ？
          </p>
        </motion.div>

        {/* 4軸バッジ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8"
        >
          {AXIS_LABELS.map((axis, i) => (
            <div key={i} className="rounded-xl bg-white border border-[#e4e0f7] p-3 shadow-sm text-center">
              <div className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest mb-1">
                第{i + 1}軸
              </div>
              <div className="text-xs font-bold text-[#1e1b4b] mb-1">{axis.key}</div>
              <div className="text-[10px] text-gray-400">
                {axis.a} / {axis.b}
              </div>
            </div>
          ))}
        </motion.div>

        {/* タイプグリッド */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {types.map((type) => (
            <motion.div key={type.code} variants={item}>
              <Link href={`/types/${type.code}`} className="block group">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-[#e4e0f7] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  {/* グラデーションヘッダー */}
                  <div className={`bg-gradient-to-br ${type.color} p-4 flex flex-col items-center text-center`}>
                    {/* コードバッジ */}
                    <div className="flex gap-1 mb-2">
                      {type.code.split("").map((letter, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-md bg-white/20 text-white text-[9px] font-bold flex items-center justify-center"
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <div className="text-3xl mb-2">{type.emoji}</div>
                    <div className="text-xs font-bold text-white leading-snug">{type.name}</div>
                    <div className="text-[9px] text-white/60 mt-0.5">{type.era}</div>
                  </div>
                  {/* タグライン */}
                  <div className="px-3 py-2.5">
                    <p className="text-[10px] text-[#6b7280] leading-snug line-clamp-2">
                      {type.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 診断CTAフッター */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[#9ca3af] mb-4">あなたのタイプをまだ診断していない方は</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-2xl font-bold text-[15px] text-white shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)" }}
          >
            診断スタート →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
