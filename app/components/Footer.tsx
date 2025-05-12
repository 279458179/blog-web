export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">关于我们</h3>
            <p className="text-gray-600 dark:text-gray-400">
              分享技术见解、教程和最佳实践的个人博客平台。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="/posts" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  文章列表
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  教程
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  关于
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                Email: contact@example.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                GitHub: github.com/yourusername
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} 我的博客. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 