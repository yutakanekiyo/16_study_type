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
  const totalAnswered = currentPage * 5 + answeredCount;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const submitRef = useRef<HTMLDivElement | null>(null);

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const firstUnanswered = pageAnswers.findIndex((a) => a === null);
    const targetIdx = firstUnanswered === -1 ? 0 : firstUnanswered;
    const timer = setTimeout(() => scrollToCard(targetIdx), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSetAnswer = (idx: number, rating: Rating) => {
    onSetAnswer(idx, rating);
    setTimeout(() => {
      const nextUnanswered = pageAnswers.findIndex((a, i) => i > idx && a === null);
      if (nextUnanswered !== -1) {
        scrollToCard(nextUnanswered);
      } else {
        submitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">

      {/* 進捗バー */}
      <div className="sticky top-0 z-20 bg-[var(--bg)] border-b border-[var(--border)] px-5 pt-4 pb-3">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--muted)]">
              Q{totalAnswered + 1} <span className="text-[var(--fg)]">/ {totalQuestions}</span>
            </span>
            <span className="text-xs font-black text-[var(--fg)]">
              {Math.round((totalAnswered / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--fg)]"
              initial={false}
              animate={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* 質問リスト */}
      <div className="flex-1 px-4 pt-4 pb-6 max-w-xl mx-auto w-full">
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
              const globalNum = currentPage * 5 + idx + 1;
              const isAnswered = selected !== null;

              return (
                <motion.div
                  key={q.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="rounded-3xl bg-white border-2 p-5 transition-all duration-200"
                  style={{
                    borderColor: isAnswered ? "#1A1A1A" : "var(--border)",
                    boxShadow: isAnswered ? "4px 4px 0px 0px rgba(0,0,0,1)" : "none",
                  }}
                >
                  {/* Q番号 + 質問テキスト */}
                  <p className="text-[13px] font-bold text-[var(--fg)] leading-relaxed mb-4 text-center">
                    <span
                      className="inline-block bg-[var(--yellow)] text-black text-[11px] font-black px-2 py-0.5 rounded-full mr-1.5"
                    >
                      Q{globalNum}
                    </span>
                    {q.text}
                  </p>

                  {/* 選択肢ラベル */}
                  <div className="mb-4 space-y-1.5 text-center">
                    <p className="text-[12px] text-[var(--fg)]">
                      <span className="font-black">A：</span>{q.optionA}
                    </p>
                    <p className="text-[12px] text-[var(--muted)]">
                      <span className="font-black">B：</span>{q.optionB}
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
                          className="rounded-full flex-shrink-0 border-2 cursor-pointer transition-all duration-150"
                          style={{
                            width: size,
                            height: size,
                            backgroundColor: isSelected
                              ? "#1A1A1A"
                              : isAside ? "#FFF8C0" : "#F0F0F0",
                            borderColor: isSelected ? "#1A1A1A" : "var(--border)",
                            transform: isSelected ? "scale(1.18)" : "scale(1)",
                            opacity: isAnswered && !isSelected ? 0.4 : 1,
                          }}
                          aria-label={`${rating}を選択`}
                        />
                      );
                    })}
                  </div>

                  {/* A / B ラベル */}
                  <div className="flex justify-between mt-1.5 px-0.5">
                    <span className="text-[11px] font-black text-[var(--fg)]">A</span>
                    <span className="text-[11px] font-black text-[var(--muted)]">B</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* 次へボタン */}
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
            className="w-full py-4 rounded-2xl font-black text-[15px] cursor-pointer transition-all duration-200"
            style={{
              background: canSubmitPage ? "#1A1A1A" : "var(--border)",
              color: canSubmitPage ? "white" : "var(--muted)",
              boxShadow: canSubmitPage ? "4px 4px 0px 0px rgba(255,229,0,1)" : "none",
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
                  backgroundColor: i <= currentPage ? "#1A1A1A" : "var(--border)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
