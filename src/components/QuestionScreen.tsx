"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import questionsData from "@/data/questions.json";

interface Question {
  id: number;
  axis: string;
  text: string;
  optionA: string;
  optionB: string;
}

interface QuestionScreenProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (choice: "A" | "B") => void;
}

const axisLabels: Record<string, { short: string; color: string }> = {
  PS: { short: "集中スイッチ", color: "#818cf8" },
  LC: { short: "理解の入り口", color: "#34d399" },
  RB: { short: "進行スタイル", color: "#fb923c" },
  TI: { short: "記憶の回路", color: "#f472b6" },
};

export default function QuestionScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  progress,
  onAnswer,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [direction, setDirection] = useState(1);

  // Reset selection when question changes
  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  const handleSelect = (choice: "A" | "B") => {
    if (selected) return;
    setSelected(choice);
    setDirection(1);
    setTimeout(() => {
      onAnswer(choice);
    }, 350);
  };

  const axisInfo = axisLabels[currentQuestion.axis] ?? { short: "", color: "#818cf8" };
  const axisData = questionsData.axes.find((a) => a.id === currentQuestion.axis);

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span
              className="text-xs font-semibold px-2 py-1 rounded-md"
              style={{
                color: axisInfo.color,
                backgroundColor: `${axisInfo.color}18`,
                border: `1px solid ${axisInfo.color}30`,
              }}
            >
              {axisInfo.short}
            </span>
          </motion.div>
          <motion.span
            className="text-xs text-white/40 tabular-nums"
            key={currentIndex}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentIndex + 1} / {totalQuestions}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${axisInfo.color}80, ${axisInfo.color})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Axis indicators */}
        <div className="flex gap-1 mt-2">
          {questionsData.axes.map((axis) => {
            const isActive = axis.id === currentQuestion.axis;
            const aColor = axisLabels[axis.id]?.color ?? "#818cf8";
            return (
              <div
                key={axis.id}
                className="flex-1 h-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? aColor : "rgba(255,255,255,0.08)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, x: 30 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 * direction }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Axis labels */}
          {axisData && (
            <div className="flex items-center justify-between mb-4 text-xs text-white/30">
              <span>{axisData.aName}</span>
              <span className="text-white/15">vs</span>
              <span>{axisData.bName}</span>
            </div>
          )}

          {/* Question text */}
          <div className="mb-8">
            <motion.p
              className="text-lg font-medium leading-relaxed text-center text-white/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Q{currentIndex + 1}. {currentQuestion.text}
            </motion.p>
          </div>

          {/* Answer options */}
          <div className="flex flex-col gap-4">
            {(["A", "B"] as const).map((choice, idx) => {
              const optionText = choice === "A" ? currentQuestion.optionA : currentQuestion.optionB;
              const isSelected = selected === choice;
              const isOther = selected !== null && selected !== choice;

              return (
                <motion.button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className="relative p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: isSelected
                      ? axisInfo.color
                      : isOther
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.1)",
                    backgroundColor: isSelected
                      ? `${axisInfo.color}15`
                      : isOther
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.05)",
                    opacity: isOther ? 0.4 : 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isOther ? 0.4 : 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                  whileHover={!selected ? { scale: 1.02, borderColor: `${axisInfo.color}60` } : {}}
                  whileTap={!selected ? { scale: 0.98 } : {}}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-20"
                      style={{ backgroundColor: axisInfo.color }}
                      initial={{ scale: 0, borderRadius: "50%" }}
                      animate={{ scale: 1, borderRadius: "1rem" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        backgroundColor: isSelected ? axisInfo.color : "rgba(255,255,255,0.08)",
                        color: isSelected ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {choice}
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{optionText}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
