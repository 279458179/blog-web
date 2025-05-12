import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Providers from './components/Providers'
import { AuthProvider } from './components/AuthProvider'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的博客',
  description: '分享技术、教程和见解的个人博客',
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <AuthProvider>
            <div className="min-h-screen flex flex-col dark:bg-gray-900">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
