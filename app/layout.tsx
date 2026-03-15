import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ScrollProgress } from "./components/InteractiveEffects";
import Chatbot from "./components/Chatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Manula Cooray | Athlete-Engineer Portfolio",
  description:
    "Portfolio of Manula Cooray, a computer science student, engineering learner, swimmer, and student leader building disciplined digital systems.",
  keywords: [
    "Manula Cooray",
    "athlete engineer portfolio",
    "computer science student",
    "engineering student",
    "SLIIT",
    "swimmer",
    "student leader",
    "Sri Lanka swimmer",
    "software engineer portfolio",
  ],
  authors: [{ name: "Manula Cooray" }],
  creator: "Manula Cooray",
  publisher: "Manula Cooray",
  alternates: {
    canonical: "https://manulacooray.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manulacooray.com",
    title: "Manula Cooray | Athlete-Engineer Portfolio",
    description:
      "Computer science student, swimmer, and student leader building thoughtful systems with discipline on and off the pool deck.",
    siteName: "Manula Cooray",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manula Cooray | Athlete-Engineer Portfolio",
    description:
      "Computer science student, swimmer, and student leader building thoughtful systems with discipline on and off the pool deck.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollProgress />
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
