"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Rating } from "@/hooks/useDiagnosis";

interface Question {
  id: number;
  axis: string;
  text: string;
  optionA: string;
  optionB: string;
}

interface QuestionScreenProps {
  currentPage: number;
  totalPages: number;
  pageQuestions: Question[];
  pageAnswers: (Rating | null)[];
  canSubmitPage: boolean;
  onSetAnswer: (index: number, rating: Rating) => void;
  onSubmitPage: () => void;
}

// 両端を大きく、中央を小さく
const BUTTON_SIZES = [44, 34, 26, 26, 34, 44];

export default function QuestionScreen({
  currentPage,
  totalPages,
  pageQuestions,
  pageAnswers,
  canSubmitPage,
  onSetAnswer,
  onSubmitPage,
}: QuestionScreenProps) {
  const isLastPage = currentPage + 1 >= totalPages;
  const answeredCount = pageAnswers.filter((a) => a !== null).length;
  const totalQuestions = totalPages * 5;
  const totalAnswered = currentPage * 6 + answeredCount;
  const remaining = totalQuestions - totalAnswered;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const submitRef = useRef<HTMLDivElement | null>(null);

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ページ切り替え時：最初の未回答質問を中央へ
  useEffect(() => {
    const firstUnanswered = pageAnswers.findIndex((a) => a === null);
    const targetIdx = firstUnanswered === -1 ? 0 : firstUnanswered;
    const timer = setTimeout(() => scrollToCard(targetIdx), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSetAnswer = (idx: number, rating: Rating) => {
    onSetAnswer(idx, rating);

    // 次の未回答へスクロール
    setTimeout(() => {
      const nextUnanswered = pageAnswers.findIndex(
        (a, i) => i > idx && a === null
      );
      if (nextUnanswered !== -1) {
        scrollToCard(nextUnanswered);
      } else {
        // 全問回答済み → 送信ボタンへ
        submitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 進捗エリア */}
      <div className="px-5 pt-6 pb-3 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium">
            残り<span className="text-violet-500 font-bold text-sm mx-0.5">{remaining}</span>問
          </span>
          <span className="text-xs text-gray-400">{totalAnswered} / {totalQuestions}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            initial={false}
            animate={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* 質問リスト */}
      <div className="flex-1 px-4 pt-2 pb-6 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {pageQuestions.map((q, idx) => {
              const selected = pageAnswers[idx];
              const globalNum = currentPage * 6 + idx + 1;
              const isAnswered = selected !== null;

              return (
                <motion.div
                  key={q.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200"
                  style={{
                    borderColor: isAnswered ? "#c4b5fd" : "#e5e7eb",
                    boxShadow: isAnswered
                      ? "0 2px 12px rgba(109,40,217,0.08)"
                      : "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* 質問番号 + テキスト */}
                  <p className="text-[13px] font-semibold text-gray-800 leading-relaxed mb-4 text-center">
                    <span className="text-violet-500 font-bold mr-1">Q{globalNum}.</span>
                    {q.text}
                  </p>

                  {/* 選択肢ラベル（縦積み） */}
                  <div className="mb-3 text-center space-y-1">
                    <p className="text-[12px] leading-snug text-violet-600">
                      <span className="font-bold">A：</span>{q.optionA}
                    </p>
                    <p className="text-[12px] leading-snug text-indigo-500">
                      <span className="font-bold">B：</span>{q.optionB}
                    </p>
                  </div>

                  {/* 6段階ボタン */}
                  <div className="flex items-center justify-center gap-2">
                    {([1, 2, 3, 4, 5, 6] as Rating[]).map((rating, btnIdx) => {
                      const size = BUTTON_SIZES[btnIdx];
                      const isSelected = selected === rating;
                      const isAside = rating <= 3;

                      return (
                        <button
                          key={rating}
                          onClick={() => handleSetAnswer(idx, rating)}
                          className="rounded-full flex-shrink-0 border-2 cursor-pointer"
                          style={{
                            width: size,
                            height: size,
                            backgroundColor: isSelected
                              ? isAside ? "#7c3aed" : "#4f46e5"
                              : "white",
                            borderColor: isSelected
                              ? isAside ? "#7c3aed" : "#4f46e5"
                              : isAnswered ? "#e5e7eb" : "#c4b5fd",
                            transform: isSelected ? "scale(1.18)" : "scale(1)",
                            boxShadow: isSelected
                              ? `0 0 0 3px ${isAside ? "#7c3aed25" : "#4f46e525"}`
                              : "none",
                            opacity: isAnswered && !isSelected ? 0.3 : 1,
                            transition: "all 0.15s ease",
                          }}
                          aria-label={`${rating}を選択`}
                        />
                      );
                    })}
                  </div>

                  {/* A / B ラベル */}
                  <div className="flex justify-between mt-1 px-0.5">
                    <span className="text-[11px] font-bold text-violet-500">A</span>
                    <span className="text-[11px] font-bold text-indigo-500">B</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* 次へ / 結果を見るボタン */}
        <motion.div
          ref={submitRef}
          className="mt-5 pb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <motion.button
            onClick={onSubmitPage}
            disabled={!canSubmitPage}
            className="w-full md:max-w-sm md:mx-auto block py-4 rounded-2xl font-bold text-[15px] cursor-pointer transition-all duration-200"
            style={{
              background: canSubmitPage
                ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)"
                : "#f3f4f6",
              color: canSubmitPage ? "white" : "#d1d5db",
              boxShadow: canSubmitPage
                ? "0 6px 24px rgba(109,40,217,0.28)"
                : "none",
            }}
            whileTap={canSubmitPage ? { scale: 0.98 } : {}}
          >
            {!canSubmitPage
              ? `あと ${pageQuestions.length - answeredCount} 問回答してください`
              : isLastPage
              ? "診断結果を見る →"
              : "次へ →"}
          </motion.button>

          {/* ページドット */}
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentPage ? 22 : 6,
                  height: 6,
                  backgroundColor:
                    i < currentPage ? "#7c3aed" : i === currentPage ? "#7c3aed" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
