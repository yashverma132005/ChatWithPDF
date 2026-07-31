import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FileText} from "lucide-react";

import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatWithPDF — Talk to your documents",
  description:
    "Upload any PDF and chat with it instantly. Ask questions, get summaries, and find answers in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <header className="flex justify-between items-center px-6 h-16 border-b">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-lg tracking-tight"
            >
              <FileText className="w-5 h-5 text-white-600" />
              <span>ChatWithPDF</span>
            </Link>

            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-gray-800">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800">
                    Sign up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}