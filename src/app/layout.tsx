import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K-K App',
  description:
    "Private couple's web application for expense tracking, to-dos, and calendar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
