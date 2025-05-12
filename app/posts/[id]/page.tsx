'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

// 模拟文章数据
const post = {
  id: 1,
  title: '开始使用 Next.js 13',
  content: `
    <h2>介绍</h2>
    <p>Next.js 13 带来了许多激动人心的新特性，包括 App Router、Server Components 等。本文将详细介绍这些新特性，并帮助你快速上手。</p>

    <h2>App Router</h2>
    <p>App Router 是 Next.js 13 最重要的新特性之一。它基于文件系统的路由，提供了更直观的路由组织方式。</p>

    <h2>Server Components</h2>
    <p>Server Components 允许你在服务器端渲染组件，减少客户端的 JavaScript 体积，提升性能。</p>

    <h2>结论</h2>
    <p>Next.js 13 的新特性为开发者提供了更强大的工具，帮助我们构建更好的 Web 应用。</p>
  `,
  author: {
    name: '张三',
    avatar: '/avatar.jpg',
  },
  date: '2024-03-15',
  category: '教程',
  tags: ['Next.js', 'React', '前端'],
  readTime: '10 分钟',
  likes: 42,
  comments: 12,
}

export default function PostPage() {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')

  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      // 处理评论提交
      setComment('')
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          {/* 文章头部 */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {post.author.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {format(new Date(post.date), 'PPP', { locale: zhCN })} · {post.readTime}
                </p>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* 文章内容 */}
          <div
            className="prose dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 互动区域 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center gap-8 mb-8">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {liked ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
                <span>{likes}</span>
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <ChatBubbleLeftIcon className="h-6 w-6" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <ShareIcon className="h-6 w-6" />
                <span>分享</span>
              </button>
            </div>

            {/* 评论区 */}
            {showComments && (
              <div className="space-y-6">
                <form onSubmit={handleComment} className="flex gap-4">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="写下你的评论..."
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    发送
                  </button>
                </form>

                {/* 评论列表 */}
                <div className="space-y-4">
                  {/* 这里可以添加评论列表组件 */}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
} 