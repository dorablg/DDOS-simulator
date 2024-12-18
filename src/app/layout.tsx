import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DDoS Attack Simulator',
  description: 'Learn about DDoS attacks and defense mechanisms through interactive simulation',
  icons: {
    icon: '/shield-icon.svg',
    shortcut: '/shield-icon.svg',
    apple: '/shield-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shield-icon.svg" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
