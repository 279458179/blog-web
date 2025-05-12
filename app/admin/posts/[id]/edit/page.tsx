'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/components/AuthProvider'

interface Post {
  id: number
  title: string
  description: string
  content: string
  date: string
  category: string
  readTime: string
}

interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] }
}

export default function EditPostPage({ params }: PageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
      return
    }
    fetchPost()
  }, [user, router])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`)
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('获取文章失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    setSaving(true)
    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })

      if (!response.ok) {
        throw new Error('保存失败')
      }

      router.push('/admin')
    } catch (error) {
      console.error('保存文章失败:', error)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">文章不存在</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              编辑文章
            </h1>
            <button
              onClick={() => router.push('/admin')}
              className="btn-secondary"
            >
              返回列表
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                标题
              </label>
              <input
                type="text"
                id="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="input mt-1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                描述
              </label>
              <textarea
                id="description"
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
                className="input mt-1"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                内容
              </label>
              <textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                className="input mt-1"
                rows={15}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  分类
                </label>
                <input
                  type="text"
                  id="category"
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  发布日期
                </label>
                <input
                  type="date"
                  id="date"
                  value={post.date}
                  onChange={(e) => setPost({ ...post, date: e.target.value })}
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  阅读时间
                </label>
                <input
                  type="text"
                  id="readTime"
                  value={post.readTime}
                  onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                  className="input mt-1"
                  placeholder="例如：10 分钟"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn"
                disabled={saving}
              >
                {saving ? '保存中...' : '保存文章'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 