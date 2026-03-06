import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "勉強タイプ診断 | あなたの学習OSを発見しよう",
  description:
    "30問の質問に答えて、歴史的偉人タイプの学習スタイルを診断。MBTIのような16タイプで、あなたの学習OSを解析します。",
  openGraph: {
    title: "勉強タイプ診断 | あなたの学習OSを発見しよう",
    description: "あなたの学習スタイルを16タイプで診断。歴史的偉人キャラクターで結果をシェアしよう！",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
