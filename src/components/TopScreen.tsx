"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TopScreenProps {
  onStart: () => void;
}

const PREVIEW_TYPES = ["PLBI", "SLBT", "SCBI", "PCBT", "SLRI", "PLRT"];

const axes = [
  { label: "P / S", desc: "一人 vs みんなと" },
  { label: "L / C", desc: "論理 vs 文脈" },
  { label: "R / B", desc: "習慣 vs 瞬発" },
  { label: "T / I", desc: "テキスト vs イメージ" },
];

export default function TopScreen({ onStart }: TopScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* ===== ヒーロー ===== */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-6 text-center">

        {/* バッジ */}
        <motion.div
          className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--yellow)]" />
          16 Study Type
        </motion.div>

        {/* キャッチコピー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-3"
        >
          <span className="inline-block bg-[var(--yellow)] text-black text-sm font-black px-2 py-0.5 mb-2">
            あなたの勉強スタイルは...
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--fg)] leading-tight tracking-tight">
            16人の偉人の<br />誰に似てる？
          </h1>
        </motion.div>

        <motion.p
          className="text-sm text-[var(--muted)] mb-8 leading-relaxed max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          20問の質問で、あなたの学習スタイルを<br />
          歴史的偉人キャラクターに診断。
        </motion.p>

        {/* CTAボタン */}
        <motion.button
          onClick={onStart}
          className="w-full max-w-xs py-4 rounded-2xl font-black text-base text-black bg-[var(--yellow)] border-2 border-black cursor-pointer hover:bg-[var(--yellow-dark)] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
        >
          診断スタート →
        </motion.button>

        <motion.p
          className="mt-3 text-xs text-[var(--muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          所要時間：約3分 / 全20問
        </motion.p>
      </div>

      {/* ===== キャラクタープレビューグリッド ===== */}
      <motion.div
        className="px-4 pb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest text-center mb-3">
          16タイプの歴史的偉人キャラクター
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-xl mx-auto">
          {PREVIEW_TYPES.map((code, i) => (
            <motion.div
              key={code}
              className="rounded-2xl overflow-hidden bg-white border border-[var(--border)] shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
            >
              <Image
                src={`/images/characters/${code}.jpg`}
                alt={code}
                width={120}
                height={120}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[var(--muted)] mt-3">
          あなたはどのキャラクター？
        </p>
      </motion.div>

      {/* ===== 4軸説明 ===== */}
      <motion.div
        className="px-4 pb-12 max-w-xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="grid grid-cols-2 gap-2">
          {axes.map((axis, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 border border-[var(--border)]">
              <div className="text-sm font-black text-[var(--fg)] mb-0.5">{axis.label}</div>
              <div className="text-[11px] text-[var(--muted)]">{axis.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
