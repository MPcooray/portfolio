import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manula Cooray | Journal',
  description:
    'Writing from Manula Cooray on engineering, AI, leadership, discipline, and lessons from competitive swimming.',
  alternates: {
    canonical: 'https://blog.manulacooray.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://blog.manulacooray.com',
    title: 'Manula Cooray | Journal',
    description:
      'Writing on engineering, AI, leadership, discipline, and lessons from competitive swimming.',
    siteName: 'Manula Cooray Journal',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
