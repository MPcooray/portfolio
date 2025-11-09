import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import LightningEffect from "./components/LightningEffect";
import { MouseGlow, ScrollProgress } from "./components/InteractiveEffects";
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
  title: "Manula Coory | Portfolio - Computer Science Student | Swimmer | SLIIT",
  description: "Manula Coory (MP Cooray) - Computer Science Student at SLIIT, Electrical and Electronic Engineering Student, Competitive Swimmer. Portfolio showcasing projects, achievements, and skills. Manula Pramodith Cooray.",
  keywords: [
    "Manula Coory",
    "Manula Cooray",
    "MP Cooray",
    "Cooray",
    "Manula",
    "Manula Pramodith",
    "Manula Pramodith Cooray",
    "swimmer cooray",
    "SLIIT cooray",
    "SLIIT student",
    "Computer Science Student",
    "Electrical Engineering Student",
    "portfolio",
    "web developer",
    "software engineer",
    "SLIIT swimming",
    "competitive swimmer",
    "Sri Lanka swimmer",
    "Ananda College swimmer",
    "SLIIT Sport Council President"
  ],
  authors: [{ name: "Manula Coory" }],
  creator: "Manula Coory",
  publisher: "Manula Coory",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://manulacooray.com',
    title: 'Manula Coory | Portfolio - Computer Science Student | Swimmer',
    description: 'Manula Coory (MP Cooray) - Computer Science Student at SLIIT, Electrical and Electronic Engineering Student, Competitive Swimmer. Portfolio showcasing projects, achievements, and skills.',
    siteName: 'Manula Coory Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manula Coory | Portfolio - Computer Science Student | Swimmer',
    description: 'Manula Coory (MP Cooray) - Computer Science Student at SLIIT, Electrical and Electronic Engineering Student, Competitive Swimmer.',
    creator: '@manulacooray',
  },
  alternates: {
    canonical: 'https://manulacooray.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Manula Coory",
              "alternateName": ["MP Cooray", "Manula Cooray", "Manula Pramodith Cooray"],
              "jobTitle": "Computer Science Student | Electrical and Electronic Engineering Student",
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Sri Lanka Institute of Information Technology (SLIIT)"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Ananda College, Colombo 10"
                }
              ],
              "knowsAbout": [
                "Computer Science",
                "Electrical Engineering",
                "Software Development",
                "Web Development",
                "Swimming"
              ],
              "sport": "Swimming",
              "url": "https://manulacooray.com"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LightningEffect />
        <MouseGlow />
        <ScrollProgress />
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
