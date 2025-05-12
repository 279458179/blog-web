import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

const featuredPosts = [
  {
    id: 1,
    title: '开始使用 Next.js 13',
    description: '了解 Next.js 13 的新特性和最佳实践，帮助你快速上手这个强大的 React 框架。',
    date: '2024-03-15',
    category: '教程',
    readTime: '10 分钟',
  },
  {
    id: 2,
    title: 'React 性能优化技巧',
    description: '探索 React 应用性能优化的关键策略和实用技巧，提升你的应用性能。',
    date: '2024-03-10',
    category: '技术',
    readTime: '15 分钟',
  },
  {
    id: 3,
    title: 'TypeScript 高级类型',
    description: '深入学习 TypeScript 的高级类型系统，掌握类型编程的精髓。',
    date: '2024-03-05',
    category: '教程',
    readTime: '12 分钟',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
              分享技术，创造价值
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              在这里，我们分享最新的技术见解、实用的教程和最佳实践，帮助你成为更好的开发者。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/posts" className="btn">
                浏览文章
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/tutorials" className="btn-secondary">
                查看教程
                <SparklesIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">精选文章</h2>
          <p className="section-subtitle">
            探索我们精心挑选的技术文章，涵盖前端开发、后端架构、DevOps 等多个领域。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="card group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                    >
                      阅读更多
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title">订阅我们的通讯</h2>
            <p className="section-subtitle">
              获取最新的技术文章和教程更新，直接发送到你的邮箱。我们承诺不会发送垃圾邮件。
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="输入你的邮箱"
                className="input"
              />
              <button type="submit" className="btn whitespace-nowrap">
                立即订阅
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
