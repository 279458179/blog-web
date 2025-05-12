'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// 模拟文章数据
const posts = [
  {
    id: 1,
    title: '开始使用 Next.js 13',
    description: '了解 Next.js 13 的新特性和最佳实践，帮助你快速上手这个强大的 React 框架。',
    date: '2024-03-15',
    category: '教程',
    tags: ['Next.js', 'React', '前端'],
    readTime: '10 分钟',
  },
  {
    id: 2,
    title: 'React 性能优化技巧',
    description: '探索 React 应用性能优化的关键策略和实用技巧，提升你的应用性能。',
    date: '2024-03-10',
    category: '技术',
    tags: ['React', '性能优化', '前端'],
    readTime: '15 分钟',
  },
  // ... 更多文章
]

const categories = ['全部', '教程', '技术', '前端', '后端', 'DevOps']
const tags = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Docker', 'AWS']

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag))
    return matchesSearch && matchesCategory && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 搜索和筛选部分 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(post.date), 'PPP', { locale: zhCN })}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </span>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    阅读更多
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 