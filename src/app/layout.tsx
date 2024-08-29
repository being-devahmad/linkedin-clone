import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils/utils";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LinkedIn 2.0",
  description: "Welcome to my linkedIn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <Navbar />
          <div className="md:bg-[#F4F2EE] flex-1 w-full">
            <main className="max-w-6xl mx-auto">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
