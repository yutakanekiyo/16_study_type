"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isTypesList = pathname === "/types";

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--yellow)]" />
          16 Study Type
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/types"
            className={`text-sm font-bold transition-colors ${
              isTypesList ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            勉強タイプ一覧
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl font-black text-sm text-black bg-[var(--yellow)] border-2 border-black hover:bg-[var(--yellow-dark)] transition-colors"
          >
            診断する →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border-2 border-[var(--border)] bg-white hover:border-black transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h14" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <Link
                href="/types"
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm font-bold text-[var(--fg)] border-b border-[var(--border)] flex items-center justify-between"
              >
                <span>勉強タイプ一覧</span>
                <span className="text-[var(--muted)]">→</span>
              </Link>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm font-black text-black flex items-center justify-between"
              >
                <span>診断する</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
