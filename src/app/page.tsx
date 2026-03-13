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
    currentPage,
    totalPages,
    pageQuestions,
    pageAnswers,
    canSubmitPage,
    result,
    start,
    setAnswer,
    submitPage,
    restart,
  } = useDiagnosis();

  return (
    <main className="min-h-screen relative">
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

        {phase === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <QuestionScreen
              currentPage={currentPage}
              totalPages={totalPages}
              pageQuestions={pageQuestions}
              pageAnswers={pageAnswers}
              canSubmitPage={canSubmitPage}
              onSetAnswer={setAnswer}
              onSubmitPage={submitPage}
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
