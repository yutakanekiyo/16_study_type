"use client";

import { useState, useCallback, useMemo } from "react";
import questionsData from "@/data/questions.json";
import resultsData from "@/data/results.json";

type Phase = "top" | "question" | "analyzing" | "result";
export type Rating = 1 | 2 | 3 | 4 | 5 | 6;

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
const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [answers, setAnswers] = useState<(Rating | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [resultCode, setResultCode] = useState<string | null>(null);

  const pageQuestions = useMemo(
    () => shuffledQuestions.slice(
      currentPage * QUESTIONS_PER_PAGE,
      (currentPage + 1) * QUESTIONS_PER_PAGE
    ),
    [shuffledQuestions, currentPage]
  );

  const pageAnswers = useMemo(
    () => answers.slice(
      currentPage * QUESTIONS_PER_PAGE,
      (currentPage + 1) * QUESTIONS_PER_PAGE
    ),
    [answers, currentPage]
  );

  const canSubmitPage = pageAnswers.every((a) => a !== null);
  const progress = (currentPage / TOTAL_PAGES) * 100;

  const start = useCallback(() => {
    setShuffledQuestions(shuffle(questions));
    setAnswers(new Array(questions.length).fill(null));
    setCurrentPage(0);
    setResultCode(null);
    setPhase("question");
  }, []);

  const setAnswer = useCallback((questionIndexInPage: number, rating: Rating) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentPage * QUESTIONS_PER_PAGE + questionIndexInPage] = rating;
      return next;
    });
  }, [currentPage]);

  const submitPage = useCallback(() => {
    if (!canSubmitPage) return;

    if (currentPage + 1 >= TOTAL_PAGES) {
      // All answered — compute result
      const finalAnswers = answers;
      const scores: Scores = {
        PS: { P: 0, S: 0 },
        LC: { L: 0, C: 0 },
        RB: { R: 0, B: 0 },
        TI: { T: 0, I: 0 },
      };

      shuffledQuestions.forEach((q, i) => {
        const rating = finalAnswers[i];
        if (rating === null) return;
        const axis = q.axis as keyof Scores;
        const axisInfo = axes.find((a) => a.id === axis)!;
        // Rating 1-3 → A side, 4-6 → B side
        if (rating <= 3) {
          (scores[axis][axisInfo.aLabel as keyof (typeof scores)[typeof axis]] as number)++;
        } else {
          (scores[axis][axisInfo.bLabel as keyof (typeof scores)[typeof axis]] as number)++;
        }
      });

      const code = computeCode(scores);
      setResultCode(code);
      setPhase("analyzing");
      setTimeout(() => setPhase("result"), 3500);
    } else {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [canSubmitPage, currentPage, answers, shuffledQuestions]);

  const restart = useCallback(() => {
    setPhase("top");
    setCurrentPage(0);
    setAnswers(new Array(questions.length).fill(null));
    setResultCode(null);
  }, []);

  const result: DiagnosisResult | null = resultCode
    ? (resultsData.types as Record<string, DiagnosisResult>)[resultCode] ?? null
    : null;

  return {
    phase,
    currentPage,
    totalPages: TOTAL_PAGES,
    pageQuestions,
    pageAnswers,
    canSubmitPage,
    progress,
    result,
    resultCode,
    start,
    setAnswer,
    submitPage,
    restart,
  };
}
