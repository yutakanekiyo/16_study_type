"use client";

import { motion, type Variants } from "framer-motion";
import { DiagnosisResult } from "@/hooks/useDiagnosis";
import resultsData from "@/data/results.json";

interface ResultScreenProps {
  result: DiagnosisResult;
  onRestart: () => void;
}

function CompatibilityCard({ code }: { code: string }) {
  const types = resultsData.types as Record<string, DiagnosisResult>;
  const r = types[code];
  if (!r) return null;
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
      <span className="text-lg">{r.emoji}</span>
      <div>
        <div className="text-xs font-semibold text-white/80">{r.name}</div>
        <div className="text-[10px] text-white/40">{code}</div>
      </div>
    </div>
  );
}

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const shareText = encodeURIComponent(
    `私の学習タイプは「${result.name}型（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断 #学習OS`
  );
  const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen px-4 py-10 pb-24 relative overflow-hidden">
      {/* Ambient glow matching result color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: result.accentColor }}
      />

      <motion.div
        className="relative z-10 max-w-sm mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header badge */}
        <motion.div variants={item} className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/50 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: result.accentColor }} />
            診断完了
          </span>
        </motion.div>

        {/* Character card */}
        <motion.div
          variants={item}
          className="relative rounded-3xl overflow-hidden mb-6 border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${result.accentColor}18 0%, rgba(0,0,0,0) 60%)`,
          }}
        >
          {/* Gradient header */}
          <div
            className={`bg-gradient-to-br ${result.color} p-8 flex flex-col items-center text-center`}
          >
            {/* Type code */}
            <div className="flex gap-1.5 mb-4">
              {result.code.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Emoji avatar */}
            <motion.div
              className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-5xl mb-4 border border-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              {result.emoji}
            </motion.div>

            <div className="text-xs text-white/60 mb-1">{result.era}</div>
            <h1 className="text-2xl font-bold text-white mb-2">{result.name}</h1>
            <p className="text-sm text-white/80 leading-relaxed">{result.tagline}</p>
          </div>

          {/* Description */}
          <div className="p-5">
            <p className="text-sm text-white/70 leading-relaxed">{result.description}</p>
          </div>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <div className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1">
              ⚡ 強み
            </div>
            <ul className="space-y-1">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-xs text-white/60 flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">·</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <div className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1">
              ⚠ 弱み
            </div>
            <ul className="space-y-1">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-white/60 flex items-start gap-1.5">
                  <span className="text-rose-400 mt-0.5">·</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Study Tips */}
        <motion.div
          variants={item}
          className="p-4 rounded-2xl mb-4 border border-white/8"
          style={{ backgroundColor: `${result.accentColor}10`, borderColor: `${result.accentColor}25` }}
        >
          <div
            className="text-xs font-semibold mb-2 flex items-center gap-1"
            style={{ color: result.accentColor }}
          >
            📖 あなたに最適な学習法
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{result.studyTips}</p>
        </motion.div>

        {/* Compatibility */}
        <motion.div variants={item} className="mb-6">
          <div className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-widest">
            相性の良いタイプ
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[10px] text-white/30 mb-1.5">最高相性</div>
              <CompatibilityCard code={result.compatibility.best} />
            </div>
            <div>
              <div className="text-[10px] text-white/30 mb-1.5">良い相性</div>
              <CompatibilityCard code={result.compatibility.good} />
            </div>
          </div>
        </motion.div>

        {/* SaaS CTA */}
        <motion.div
          variants={item}
          className="relative rounded-3xl overflow-hidden mb-5 border border-white/10"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.15) 100%)" }}
        >
          <div className="p-5">
            <div className="text-[10px] text-violet-400 font-semibold tracking-widest uppercase mb-2">
              🚀 Next Step
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              あなたの学習タイプに合わせた環境で学ぼう
            </h3>
            <p className="text-xs text-white/55 leading-relaxed mb-4">
              {result.saasMessage}
              <br />
              オンライン自習室とAI学習サポートで、{result.name}型の力を最大限に引き出しましょう。
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
                }}
              >
                無料でオンライン自習室を試す →
              </a>
              <a
                href="#"
                className="block w-full text-center py-3 rounded-xl text-xs text-white/50 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
              >
                AI学習サポートについて詳しく見る
              </a>
            </div>
          </div>
        </motion.div>

        {/* Share buttons */}
        <motion.div variants={item} className="flex gap-3 mb-6">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/8 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/12 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            結果をシェア
          </a>

          <button
            onClick={() => {
              const text = `私の学習タイプは「${result.name}型（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断`;
              navigator.clipboard?.writeText(text);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/8 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/12 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            テキストコピー
          </button>
        </motion.div>

        {/* Restart */}
        <motion.button
          variants={item}
          onClick={onRestart}
          className="w-full py-3 rounded-xl text-sm text-white/35 border border-white/8 hover:border-white/15 hover:text-white/50 transition-all cursor-pointer"
        >
          もう一度診断する
        </motion.button>
      </motion.div>
    </div>
  );
}
