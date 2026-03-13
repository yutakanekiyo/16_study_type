"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import TopScreen from "@/components/TopScreen";
import QuestionScreen from "@/components/QuestionScreen";
import AnalyzingScreen from "@/components/AnalyzingScreen";

export default function Home() {
  const router = useRouter();
  const {
    phase,
    currentPage,
    totalPages,
    pageQuestions,
    pageAnswers,
    canSubmitPage,
    resultCode,
    start,
    setAnswer,
    submitPage,
  } = useDiagnosis();

  useEffect(() => {
    if (phase === "result" && resultCode) {
      router.push(`/types/${resultCode}`);
    }
  }, [phase, resultCode, router]);

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

        {/* result phase: useEffect でリダイレクト */}
      </AnimatePresence>
    </main>
  );
}
