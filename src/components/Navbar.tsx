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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e4e0f7]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-sm font-bold text-[#1e1b4b] hover:text-violet-600 transition-colors"
        >
          🎓 勉強タイプ診断
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/types"
            className={`text-sm font-medium transition-colors ${
              isTypesList
                ? "text-violet-600"
                : "text-[#4b5563] hover:text-violet-600"
            }`}
          >
            勉強タイプ一覧
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)" }}
          >
            診断する →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h14" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
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
            className="md:hidden overflow-hidden border-t border-[#e4e0f7] bg-white"
          >
            <div className="px-4 py-2 flex flex-col">
              <Link
                href="/types"
                onClick={() => setIsOpen(false)}
                className="py-3.5 text-sm font-medium text-[#4b5563] border-b border-[#f3f4f6] flex items-center justify-between"
              >
                <span>勉強タイプ一覧</span>
                <span className="text-gray-300">→</span>
              </Link>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="py-3.5 text-sm font-semibold text-violet-600 flex items-center justify-between"
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
