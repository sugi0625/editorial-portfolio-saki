import type { Metadata } from "next";

import "@fontsource-variable/inter";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/cinzel/800.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "pretendard/dist/web/variable/pretendardvariable.css";

import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "이혜숙 · Web / UI Designer",
    template: "%s — 이혜숙 Portfolio",
  },

  description:
    "정보를 이해하고 구조를 설계하며 화면을 만드는 Web / UI Designer 이혜숙의 포트폴리오입니다.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
