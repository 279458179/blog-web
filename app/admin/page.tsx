'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/AuthProvider'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

interface Post {
  id: number
  title: string
  description: string
  date: string
  category: string
  readTime: string
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
      return
    }
    fetchPosts()
  }, [user, router])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('获取文章列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这篇文章吗？')) return

    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error('删除文章失败:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            文章管理
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/posts/new')}
              className="btn"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              新建文章
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              退出登录
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  发布日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  阅读时间
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 