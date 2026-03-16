"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import resultsData from "@/data/results.json";

type ResultType = {
  code: string;
  name: string;
  nickname: string;
  historicalName: string;
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
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 py-10 pb-20">

        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--yellow)]" />
            全16タイプ
          </span>
          <h1 className="text-3xl font-black text-[var(--fg)] mb-2">勉強タイプ一覧</h1>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
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
            <div key={i} className="rounded-2xl bg-white border border-[var(--border)] p-3 text-center">
              <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest mb-1">
                第{i + 1}軸
              </div>
              <div className="text-xs font-black text-[var(--fg)] mb-1">{axis.key}</div>
              <div className="text-[10px] text-[var(--muted)]">
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
                <div className="rounded-2xl overflow-hidden border-2 border-[var(--border)] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                  {/* キャラクター画像 */}
                  <div className="relative bg-[var(--bg)]">
                    <Image
                      src={`/images/characters/${type.code}.jpg`}
                      alt={type.historicalName}
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                    {/* コードバッジ */}
                    <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                      {type.code}
                    </div>
                  </div>
                  {/* テキスト */}
                  <div className="px-3 py-2.5">
                    <div className="text-[9px] font-black text-[var(--muted)] mb-0.5 leading-tight">
                      {type.nickname}
                    </div>
                    <div className="text-xs font-black text-[var(--fg)] leading-snug">
                      {type.historicalName}
                    </div>
                    <div className="text-[9px] text-[var(--muted)] mt-0.5">{type.era}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 診断CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[var(--muted)] mb-4">あなたのタイプをまだ診断していない方は</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-2xl font-black text-[15px] text-black bg-[var(--yellow)] border-2 border-black hover:bg-[var(--yellow-dark)] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            診断スタート →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
