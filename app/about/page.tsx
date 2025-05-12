import Image from 'next/image'
import { EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 个人介绍 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="/avatar.jpg"
              alt="个人头像"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            热爱技术，热爱分享。致力于帮助更多开发者成长。
          </p>
        </div>

        {/* 技能和经验 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              技术栈
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  前端开发
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  后端开发
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              工作经历
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  高级前端工程师
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  某科技公司 | 2020 - 至今
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  负责公司核心产品的前端架构设计和开发，推动技术栈升级和性能优化。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  全栈开发工程师
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  某创业公司 | 2018 - 2020
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  参与产品从0到1的全过程，负责前后端开发和系统架构设计。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="max-w-2xl mx-auto">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              联系我
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="mailto:contact@example.com"
                className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>contact@example.com</span>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span>github.com/yourusername</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 