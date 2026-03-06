"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import TopScreen from "@/components/TopScreen";
import QuestionScreen from "@/components/QuestionScreen";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import ResultScreen from "@/components/ResultScreen";

export default function Home() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    result,
    start,
    answer,
    restart,
  } = useDiagnosis();

  return (
    <main className="min-h-screen max-w-md mx-auto relative">
      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "top" && (
          <motion.div
            key="top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TopScreen onStart={start} />
          </motion.div>
        )}

        {phase === "question" && currentQuestion && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <QuestionScreen
              currentQuestion={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              progress={progress}
              onAnswer={answer}
            />
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnalyzingScreen />
          </motion.div>
        )}

        {phase === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ResultScreen result={result} onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
