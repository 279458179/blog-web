'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlayIcon } from '@heroicons/react/24/solid'

const tutorials = [
  {
    id: 1,
    title: 'Next.js 13 完全指南',
    description: '从零开始学习 Next.js 13，掌握 App Router、Server Components 等新特性。',
    level: '入门',
    duration: '2小时',
    lessons: 12,
    image: '/tutorials/nextjs.jpg',
  },
  {
    id: 2,
    title: 'React 高级模式',
    description: '深入学习 React 高级概念，包括 Hooks、Context、性能优化等。',
    level: '进阶',
    duration: '3小时',
    lessons: 15,
    image: '/tutorials/react.jpg',
  },
  {
    id: 3,
    title: 'TypeScript 实战',
    description: '通过实际项目学习 TypeScript，掌握类型系统和最佳实践。',
    level: '中级',
    duration: '2.5小时',
    lessons: 10,
    image: '/tutorials/typescript.jpg',
  },
]

const levels = ['全部', '入门', '中级', '进阶']

export default function TutorialsPage() {
  const [selectedLevel, setSelectedLevel] = useState('全部')

  const filteredTutorials = tutorials.filter(
    tutorial => selectedLevel === '全部' || tutorial.level === selectedLevel
  )

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            精选教程
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            通过我们的视频教程，快速掌握最新的技术栈
          </p>
        </div>

        {/* 难度筛选 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedLevel === level
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* 教程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map(tutorial => (
            <div key={tutorial.id} className="card group">
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {tutorial.level}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tutorial.duration}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tutorial.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tutorial.lessons} 课时
                  </span>
                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    开始学习
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 