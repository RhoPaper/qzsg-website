'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: '机构介绍',
    children: [
      { label: '机构介绍', href: '/about' },
      { label: '品牌故事', href: '/brand' },
      { label: '游学研学', href: '/study' },
      { label: '开心毕业季摄影', href: '/graduation' },
      { label: '拾光体智能', href: '/intelligence' },
      { label: '拾光国防军警课', href: '/defense' }
    ]
  },
  {
    label: '员工通道',
    children: [
      { label: '小程序后台', href: '/admin' },
      { label: '意外险购买', href: '/insurance' },
      { label: '照片管理', href: '/photos' },
      { label: '金数据', href: '/data' },
      { label: '培训微课', href: '/training' },
      { label: '旅游合同', href: '/contract' },
      { label: '兼职导师申请', href: '/apply' },
      { label: '文旅局统计上报', href: '/report' },
      { label: '全国旅行社管理', href: '/management' }
    ]
  }
]

export function NavMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <nav className="hidden md:flex">
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="relative group"
            onMouseEnter={() => setActiveMenu(item.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-white hover:text-teal-200 transition-colors py-2 flex items-center gap-1"
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>
            ) : (
              <button className="text-white hover:text-teal-200 transition-colors py-2 flex items-center gap-1">
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {item.children && (
              <div
                className={cn(
                  "absolute top-full -left-4 min-w-[200px] bg-orange-400 rounded-b-lg shadow-lg transition-all duration-300 transform origin-top",
                  activeMenu === item.label
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                )}
              >
                <ul className="py-2">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href || '#'}
                        className="block px-4 py-2 text-white hover:bg-orange-500 transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

