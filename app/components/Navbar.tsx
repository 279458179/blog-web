'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/posts' },
  { name: '教程', href: '/tutorials' },
  { name: '关于', href: '/about' },
]

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Blog
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <div className="sm:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
} 