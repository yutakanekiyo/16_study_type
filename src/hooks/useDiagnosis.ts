"use client";

import { useState, useCallback } from "react";
import questionsData from "@/data/questions.json";
import resultsData from "@/data/results.json";

type Phase = "top" | "question" | "analyzing" | "result";

interface Scores {
  PS: { P: number; S: number };
  LC: { L: number; C: number };
  RB: { R: number; B: number };
  TI: { T: number; I: number };
}

export interface DiagnosisResult {
  code: string;
  name: string;
  emoji: string;
  era: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  studyTips: string;
  saasMessage: string;
  compatibility: { best: string; good: string };
  color: string;
  accentColor: string;
}

const { questions, axes } = questionsData;

function computeCode(scores: Scores): string {
  const axisMap = [
    { key: "PS" as const, a: "P", b: "S", threshold: axes.find((a) => a.id === "PS")!.threshold },
    { key: "LC" as const, a: "L", b: "C", threshold: axes.find((a) => a.id === "LC")!.threshold },
    { key: "RB" as const, a: "R", b: "B", threshold: axes.find((a) => a.id === "RB")!.threshold },
    { key: "TI" as const, a: "T", b: "I", threshold: axes.find((a) => a.id === "TI")!.threshold },
  ];

  return axisMap
    .map(({ key, a, b, threshold }) => {
      const aScore = scores[key][a as keyof (typeof scores)[typeof key]];
      return aScore >= threshold ? a : b;
    })
    .join("");
}

export function useDiagnosis() {
  const [phase, setPhase] = useState<Phase>("top");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B")[]>([]);
  const [resultCode, setResultCode] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const progress = (currentIndex / totalQuestions) * 100;

  const currentQuestion = questions[currentIndex] ?? null;

  const start = useCallback(() => {
    setPhase("question");
    setCurrentIndex(0);
    setAnswers([]);
    setResultCode(null);
  }, []);

  const answer = useCallback(
    (choice: "A" | "B") => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);

      if (currentIndex + 1 >= totalQuestions) {
        // Calculate scores
        const scores: Scores = {
          PS: { P: 0, S: 0 },
          LC: { L: 0, C: 0 },
          RB: { R: 0, B: 0 },
          TI: { T: 0, I: 0 },
        };

        questions.forEach((q, i) => {
          const ans = newAnswers[i];
          const axis = q.axis as keyof Scores;
          const axisInfo = axes.find((a) => a.id === axis)!;
          if (ans === "A") {
            (scores[axis][axisInfo.aLabel as keyof (typeof scores)[typeof axis]] as number)++;
          } else {
            (scores[axis][axisInfo.bLabel as keyof (typeof scores)[typeof axis]] as number)++;
          }
        });

        const code = computeCode(scores);
        setResultCode(code);
        setPhase("analyzing");

        setTimeout(() => {
          setPhase("result");
        }, 3500);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [answers, currentIndex, totalQuestions]
  );

  const restart = useCallback(() => {
    setPhase("top");
    setCurrentIndex(0);
    setAnswers([]);
    setResultCode(null);
  }, []);

  const result: DiagnosisResult | null = resultCode
    ? (resultsData.types as Record<string, DiagnosisResult>)[resultCode] ?? null
    : null;

  return {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    result,
    resultCode,
    start,
    answer,
    restart,
  };
}
