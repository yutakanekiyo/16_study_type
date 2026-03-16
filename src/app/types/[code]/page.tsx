"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import resultsData from "@/data/results.json";
import typeDetailsData from "@/data/typeDetails.json";

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
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" as const } },
};

function RelatedCard({ code, label }: { code: string; label: string }) {
  const types = resultsData.types as Record<string, ResultType>;
  const r = types[code];
  if (!r) return null;
  return (
    <Link href={`/types/${code}`} className="block group">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm hover:shadow-md hover:border-black/20 transition-all">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg)]">
          <Image
            src={`/images/characters/${code}.jpg`}
            alt={r.historicalName}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-0.5">{label}</div>
          <div className="text-sm font-bold text-[var(--fg)] truncate">{r.historicalName}</div>
          <div className="text-[10px] text-[var(--muted)]">{code}</div>
        </div>
        <span className="text-[var(--muted)] group-hover:text-black transition-colors text-lg">→</span>
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

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-[var(--fg)] mb-2">タイプが見つかりません</h1>
          <p className="text-sm text-[var(--muted)] mb-6">コード「{code}」は存在しません。</p>
          <Link href="/" className="inline-block px-6 py-3 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            診断に戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl mb-3">🚧</div>
          <p className="text-sm text-[var(--muted)]">このタイプの詳細コンテンツは近日公開予定です。</p>
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

  const shareText = encodeURIComponent(
    `私の学習タイプは「${result.name}（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断 #学習OS`
  );
  const shareUrl = encodeURIComponent(`https://16studytype.vercel.app/types/${result.code}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-xl mx-auto px-4 py-8 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >

          {/* ===== ヒーローセクション ===== */}
          <motion.div variants={item} className="pt-2">
            {/* あなたの勉強タイプは */}
            <p className="text-sm font-bold text-[var(--accent)] mb-2 tracking-wide">
              あなたの勉強タイプは...
            </p>

            {/* ニックネーム（黄色ハイライト） */}
            <div className="mb-1">
              <span className="inline-block bg-[var(--yellow)] text-black text-base font-bold px-2 py-0.5 leading-tight">
                {result.nickname}
              </span>
            </div>

            {/* 歴史的人物名（大きく太く） */}
            <h1 className="text-4xl font-black text-[var(--fg)] leading-none mb-4 tracking-tight">
              {result.historicalName}
            </h1>

            {/* タイプコード（アウトライン） */}
            <p
              className="text-outline text-6xl font-black tracking-widest mb-5 leading-none"
            >
              {result.code}
            </p>

            {/* タグライン（左ボーダー） */}
            <div className="border-l-4 border-[var(--accent)] pl-4 mb-6">
              <p className="text-sm text-[var(--fg)] leading-relaxed font-medium">
                {result.tagline}
              </p>
            </div>

            {/* キャラクター画像 */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[var(--border)] shadow-sm">
              <Image
                src={`/images/characters/${result.code}.jpg`}
                alt={result.historicalName}
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* ===== キャラクター概要 ===== */}
          <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-[var(--border)]">
            <h2 className="text-base font-black text-[var(--fg)] mb-4">
              あなたはどんな勉強タイプ？
            </h2>
            <div className="space-y-3">
              {paragraphsOverview.map((p, i) => (
                <p key={i} className="text-sm text-[#3A3530] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 格言 ===== */}
          <motion.div
            variants={item}
            className="bg-[var(--fg)] rounded-3xl p-6"
          >
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
              格言
            </div>
            <blockquote className="text-base font-bold text-white leading-relaxed">
              「{detail.quote}」
            </blockquote>
          </motion.div>

          {/* ===== 人物との関連性 ===== */}
          <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--yellow)] border-2 border-black" />
              <h2 className="text-sm font-black text-[var(--fg)] uppercase tracking-wide">
                {result.historicalName}との関連性
              </h2>
            </div>
            <div className="space-y-3">
              {paragraphsConnection.map((p, i) => (
                <p key={i} className="text-sm text-[#3A3530] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 歴史コラム ===== */}
          <motion.div variants={item} className="bg-white rounded-3xl overflow-hidden border border-[var(--border)]">
            <div className="bg-[var(--yellow)] px-6 py-4">
              <div className="text-[10px] font-bold text-black/50 uppercase tracking-widest mb-1">Column</div>
              <h2 className="text-base font-black text-black">{detail.historyTitle}</h2>
              <span className="text-xs text-black/50">{detail.historyEra}</span>
            </div>
            <div className="px-6 py-5 space-y-3">
              {paragraphsHistory.map((p, i) => (
                <p key={i} className="text-sm text-[#3A3530] leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== 強み・弱み ===== */}
          <motion.div variants={item} className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-3xl p-5 border border-[var(--border)]">
              <div className="text-xs font-black text-black mb-1">⚡ 強み</div>
              <div className="w-8 h-0.5 bg-[var(--yellow)] mb-3" />
              <div className="space-y-2">
                {paragraphsStrengths.map((p, i) => (
                  <p key={i} className="text-xs text-[#3A3530] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-[var(--border)]">
              <div className="text-xs font-black text-black mb-1">⚠ 弱み</div>
              <div className="w-8 h-0.5 bg-black/20 mb-3" />
              <div className="space-y-2">
                {paragraphsWeaknesses.map((p, i) => (
                  <p key={i} className="text-xs text-[#3A3530] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== あるある ===== */}
          <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-[var(--border)]">
            <h2 className="text-base font-black text-[var(--fg)] mb-4">
              {result.historicalName}の「あるある」
            </h2>
            <ul className="space-y-3">
              {detail.aruaru.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#3A3530] leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--yellow)] border-2 border-black flex items-center justify-center text-[10px] font-black text-black mt-0.5">
                    {i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== 相棒とライバル ===== */}
          <motion.div variants={item} className="bg-white rounded-3xl p-6 border border-[var(--border)]">
            <h2 className="text-base font-black text-[var(--fg)] mb-4">相棒とライバル</h2>
            <div className="flex flex-col gap-4">
              {[detail.companion, detail.rival].map((rel) => (
                <div key={rel.code}>
                  <RelatedCard code={rel.code} label={rel.label} />
                  <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed px-1">{rel.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== メッセージ ===== */}
          <motion.div variants={item} className="bg-[var(--fg)] rounded-3xl p-7">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Message</div>
            <blockquote className="text-sm font-bold text-[var(--yellow)] leading-relaxed mb-5 border-l-2 border-[var(--yellow)]/30 pl-4">
              「{detail.messageQuote}」
            </blockquote>
            <div className="space-y-3">
              {paragraphsMessage.map((p, i) => (
                <p key={i} className="text-sm text-white/80 leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          {/* ===== SaaS CTA ===== */}
          <motion.div variants={item} className="bg-[var(--yellow)] rounded-3xl p-6 border-2 border-black">
            <div className="text-[10px] font-black text-black/50 uppercase tracking-widest mb-2">
              🚀 Next Step
            </div>
            <h3 className="text-base font-black text-black mb-2">
              あなたの学習タイプに合わせた環境で学ぼう
            </h3>
            <p className="text-xs text-black/70 leading-relaxed mb-4">
              {result.saasMessage}<br />
              オンライン自習室とAI学習サポートで、{result.historicalName}の力を最大限に引き出しましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="#"
                className="flex-1 block text-center py-3.5 rounded-2xl font-black text-sm text-white bg-black hover:bg-gray-800 transition-colors"
              >
                無料でオンライン自習室を試す →
              </a>
              <a
                href="#"
                className="flex-1 block text-center py-3 rounded-2xl text-xs text-black/70 border-2 border-black/30 hover:border-black transition-colors"
              >
                AI学習サポートを詳しく見る
              </a>
            </div>
          </motion.div>

          {/* ===== シェアボタン ===== */}
          <motion.div variants={item} className="flex gap-3">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              結果をシェア
            </a>
            <button
              onClick={() => {
                const text = `私の学習タイプは「${result.name}（${result.code}）」でした！\n${result.tagline}\n#勉強タイプ診断`;
                navigator.clipboard?.writeText(text);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white border-2 border-[var(--border)] text-sm font-bold text-[var(--fg)] hover:border-black transition-colors cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              テキストコピー
            </button>
          </motion.div>

          {/* ===== フッター ===== */}
          <motion.div variants={item}>
            <Link
              href="/"
              className="block w-full text-center py-3.5 rounded-2xl text-sm font-bold text-[var(--muted)] bg-white border border-[var(--border)] hover:border-black hover:text-black transition-all"
            >
              もう一度診断する
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
