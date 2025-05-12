'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchResult {
  id: number
  title: string
  description: string
  type: 'post' | 'tutorial'
  url: string
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()

  // 模拟搜索结果
  const mockResults: SearchResult[] = [
    {
      id: 1,
      title: '开始使用 Next.js 13',
      description: '了解 Next.js 13 的新特性和最佳实践...',
      type: 'post',
      url: '/posts/1',
    },
    {
      id: 2,
      title: 'Next.js 13 完全指南',
      description: '从零开始学习 Next.js 13...',
      type: 'tutorial',
      url: '/tutorials/1',
    },
  ]

  useEffect(() => {
    if (query.trim()) {
      // 这里可以替换为实际的搜索 API 调用
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleResultClick = (url: string) => {
    router.push(url)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative max-w-2xl mx-auto mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索文章和教程..."
                  className="w-full px-4 py-3 pl-12 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-t-lg focus:outline-none"
                  autoFocus
                />
                <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map(result => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.type === 'post' ? '文章' : '教程'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                  没有找到相关结果
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 