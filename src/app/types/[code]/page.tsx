"use client";

import { use } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import resultsData from "@/data/results.json";
import typeDetailsData from "@/data/typeDetails.json";

type ResultType = {
  code: string;
  name: string;
  emoji: string;
  era: string;
  tagline: string;
  color: string;
  accentColor: string;
  saasMessage: string;
};

type TypeDetail = {
  characterName: string;
  characterOverview: string;
  quote: string;
  connection: string;
  historyTitle: string;
  historyEra: string;
  historyText: string;
  strengthsDetail: string;
  weaknessesDetail: string;
  aruaru: string[];
  companion: { code: string; label: string; text: string };
  rival: { code: string; label: string; text: string };
  messageQuote: string;
  messageBody: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" } },
};

function RelatedCard({ code, label }: { code: string; label: string }) {
  const types = resultsData.types as Record<string, ResultType>;
  const r = types[code];
  if (!r) return null;
  return (
    <Link href={`/types/${code}`} className="block group">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e4e0f7] shadow-sm hover:shadow-md hover:border-violet-300 transition-all">
        <span className="text-3xl">{r.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-violet-400 uppercase tracking-widest mb-0.5">{label}</div>
          <div className="text-sm font-bold text-[#1e1b4b] truncate">{r.name}</div>
          <div className="text-[10px] text-gray-400">{code}</div>
        </div>
        <span className="text-gray-300 group-hover:text-violet-400 transition-colors text-lg">→</span>
      </div>
    </Link>
  );
}

export default function TypeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const upperCode = code.toUpperCase();

  const types = resultsData.types as Record<string, ResultType>;
  const details = typeDetailsData as Record<string, TypeDetail>;

  const result = types[upperCode];
  const detail = details[upperCode];

  // タイプが存在しない場合
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff] px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-[#1e1b4b] mb-2">タイプが見つかりません</h1>
          <p className="text-sm text-gray-500 mb-6">コード「{code}」は存在しません。</p>
          <Link href="/" className="inline-block px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors">
            診断に戻る
          </Link>
        </div>
      </div>
    );
  }

  // 詳細ページが未作成の場合
  if (!detail) {
    return (
      <div className="min-h-screen bg-[#f5f3ff] px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl overflow-hidden shadow-lg mb-6 bg-gradient-to-br ${result.color} p-10 flex flex-col items-center text-center`}>
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h1 className="text-2xl font-bold text-white mb-1">{result.name}</h1>
            <div className="text-white/60 text-sm mb-3">{result.code} · {result.era}</div>
            <p className="text-white/80 text-sm leading-relaxed">{result.tagline}</p>
          </div>
          <div className="rounded-2xl bg-white border border-[#e4e0f7] p-8 text-center shadow-sm">
            <div className="text-3xl mb-3">🚧</div>
            <h2 className="text-base font-bold text-[#1e1b4b] mb-2">詳細ページ準備中</h2>
            <p className="text-sm text-gray-500">このタイプの詳細コンテンツは近日公開予定です。</p>
          </div>
        </div>
      </div>
    );
  }

  const paragraphsOverview = detail.characterOverview.split("\n\n");
  const paragraphsConnection = detail.connection.split("\n\n");
  const paragraphsHistory = detail.historyText.split("\n\n");
  const paragraphsStrengths = detail.strengthsDetail.split("\n\n");
  const paragraphsWeaknesses = detail.weaknessesDetail.split("\n\n");
  const paragraphsMessage = detail.messageBody.split("\n\n");

  return (
    <div className="min-h-screen bg-[#f5f3ff] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: result.accentColor }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">

          {/* ===== ヘッダー ===== */}
          <motion.div variants={item} className="rounded-3xl overflow-hidden shadow-lg">
            <div className={`bg-gradient-to-br ${result.color} p-8 flex flex-col items-center text-center`}>
              {/* コードバッジ */}
              <div className="flex gap-1.5 mb-5">
                {result.code.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 280 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-5xl mb-4 border border-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              >
                {result.emoji}
              </motion.div>
              <div className="text-xs text-white/60 mb-1">{result.era}</div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">あなたの勉強タイプ</div>
              <h1 className="text-2xl font-bold text-white mb-1">{detail.characterName}</h1>
              <p className="text-sm text-white/75 leading-relaxed mt-1">{result.tagline}</p>
            </div>
          </motion.div>

          {/* ===== キャラクター概要 ===== */}
          <motion.div variants={item} className="rounded-2xl bg-white shadow-sm border border-[#e4e0f7] p-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: result.accentColor }}>
              キャラクター概要
            </div>
            <div className="space-y-3">
              {paragraphsOverview.map((p, i) => (
                <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 格言 ===== */}
          <motion.div
            variants={item}
            className="rounded-2xl bg-white shadow-sm p-6"
            style={{ borderLeft: `4px solid ${result.accentColor}` }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-400">
              格言
            </div>
            <blockquote className="text-base font-medium text-[#1e1b4b] leading-relaxed italic">
              「{detail.quote}」
            </blockquote>
          </motion.div>

          {/* ===== 人物との関連性 ===== */}
          <motion.div variants={item} className="rounded-2xl bg-white shadow-sm border border-[#e4e0f7] p-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: result.accentColor }}>
              {result.name}という人物との関連性
            </div>
            <div className="space-y-3">
              {paragraphsConnection.map((p, i) => (
                <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 歴史コラム ===== */}
          <motion.div variants={item} className="rounded-2xl overflow-hidden shadow-sm border border-[#e4e0f7]">
            <div className="px-6 pt-5 pb-2 bg-white">
              <div className="text-xs font-semibold uppercase tracking-widest mb-1 text-gray-400">Column</div>
              <div className="flex items-baseline gap-2 mb-4">
                <h2 className="text-base font-bold text-[#1e1b4b]">{detail.historyTitle}</h2>
                <span className="text-xs text-gray-400">{detail.historyEra}</span>
              </div>
            </div>
            <div className="px-6 pb-6 bg-white space-y-3">
              {paragraphsHistory.map((p, i) => (
                <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 強み・弱み ===== */}
          <motion.div variants={item} className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-6">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">あなたの強み</div>
              <div className="space-y-3">
                {paragraphsStrengths.map((p, i) => (
                  <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-rose-100 shadow-sm p-6">
              <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">克服すべき弱み</div>
              <div className="space-y-3">
                {paragraphsWeaknesses.map((p, i) => (
                  <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== あるある ===== */}
          <motion.div variants={item} className="rounded-2xl bg-white shadow-sm border border-[#e4e0f7] p-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: result.accentColor }}>
              {result.name}の「あるある」
            </div>
            <ul className="space-y-3">
              {detail.aruaru.map((item_text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                    style={{ backgroundColor: result.accentColor }}
                  >
                    {i + 1}
                  </span>
                  {item_text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== 相棒とライバル ===== */}
          <motion.div variants={item} className="rounded-2xl bg-white shadow-sm border border-[#e4e0f7] p-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: result.accentColor }}>
              相棒とライバル
            </div>
            <div className="flex flex-col gap-4">
              {[detail.companion, detail.rival].map((rel) => (
                <div key={rel.code}>
                  <RelatedCard code={rel.code} label={rel.label} />
                  <p className="mt-2 text-xs text-[#6b7280] leading-relaxed px-1">{rel.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== メッセージ ===== */}
          <motion.div
            variants={item}
            className="rounded-3xl overflow-hidden shadow-md"
            style={{ background: `linear-gradient(135deg, ${result.accentColor}ee 0%, #1e1b4b 100%)` }}
          >
            <div className="p-7">
              <div className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-3">Message</div>
              <blockquote className="text-sm font-semibold text-white leading-relaxed mb-5 border-l-2 border-white/30 pl-4 italic">
                「{detail.messageQuote}」
              </blockquote>
              <div className="space-y-3">
                {paragraphsMessage.map((p, i) => (
                  <p key={i} className="text-sm text-white/80 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== SaaS CTA ===== */}
          <motion.div
            variants={item}
            className="rounded-3xl overflow-hidden shadow-md"
            style={{ background: "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)" }}
          >
            <div className="p-5">
              <div className="text-[10px] text-violet-200 font-semibold tracking-widest uppercase mb-2">
                🚀 Next Step
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                あなたの学習タイプに合わせた環境で学ぼう
              </h3>
              <p className="text-xs text-violet-100/80 leading-relaxed mb-4">
                {result.saasMessage}
                <br />
                オンライン自習室とAI学習サポートで、{result.name}の力を最大限に引き出しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="#"
                  className="flex-1 block text-center py-3.5 rounded-xl font-semibold text-sm text-[#6d28d9] bg-white cursor-pointer hover:bg-violet-50 transition-colors"
                >
                  無料でオンライン自習室を試す →
                </a>
                <a
                  href="#"
                  className="flex-1 block text-center py-3 rounded-xl text-xs text-white/70 border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
                >
                  AI学習サポートについて詳しく見る
                </a>
              </div>
            </div>
          </motion.div>

          {/* ===== シェアボタン ===== */}
          <motion.div variants={item} className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`私の学習タイプは「${result.name}（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断 #学習OS`)}&url=${encodeURIComponent(`https://16studytype.vercel.app/types/${result.code}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[#e4e0f7] text-sm font-medium text-[#1e1b4b] hover:bg-violet-50 transition-colors cursor-pointer shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              結果をシェア
            </a>
            <button
              onClick={() => {
                const text = `私の学習タイプは「${result.name}（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断`;
                navigator.clipboard?.writeText(text);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[#e4e0f7] text-sm font-medium text-[#1e1b4b] hover:bg-violet-50 transition-colors cursor-pointer shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              テキストコピー
            </button>
          </motion.div>

          {/* ===== フッターボタン ===== */}
          <motion.div variants={item} className="pt-2">
            <Link
              href="/"
              className="block w-full text-center py-3 rounded-xl text-sm text-gray-400 bg-white border border-[#e4e0f7] hover:border-violet-200 hover:text-violet-500 transition-all"
            >
              もう一度診断する
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
