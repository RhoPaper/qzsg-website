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

// 导航菜单项配置
const menuItems: MenuItem[] = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: '机构介绍',
    children: [
      { label: '机构介绍', href: '机构介绍链接' },
      { label: '品牌故事', href: '品牌故事链接' },
      { label: '游学研学', href: '游学研学链接' },
      { label: '开心毕业季摄影', href: '毕业摄影链接' },
      { label: '拾光体智能', href: '体智能链接' },
      { label: '拾光国防军警课', href: '军警课链接' }
    ]
  },
  {
    label: '查看活动',
    children: [
      { label: '直播活动', href: '直播活动链接' },
      { label: '公众号(小程序)', href: '小程序链接' },
      { label: '官方视频号', href: '视频号链接' }
    ]
  },
  {
    label: '员工通道',
    children: [
      { label: '小程序后台', href: '后台管理链接' },
      { label: '意外险购买', href: '保险购买链接' },
      { label: '照片管理', href: '照片管理链接' },
      { label: '金数据', href: '数据管理链接' },
      { label: '培训微课', href: '培训课程链接' },
      { label: '旅游合同', href: '合同管理链接' },
      { label: '兼职导师申请', href: '导师申请链接' },
      { label: '文旅局统计上报', href: '统计上报链接' },
      { label: '全国旅行社管理', href: '旅行社管理链接' }
    ]
  }
]

interface NavMenuProps {
  isMobile?: boolean
  closeMenu?: () => void
}

export default function NavMenu({ isMobile = false, closeMenu }: NavMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleItemClick = (item: MenuItem) => {
    if (isMobile) {
      if (item.children) {
        setActiveMenu(activeMenu === item.label ? null : item.label)
      } else if (closeMenu) {
        closeMenu()
      }
    }
  }

  return (
    <nav className={cn(isMobile ? "w-full" : "hidden md:block")}>
      <ul className={cn("flex", isMobile ? "flex-col space-y-4" : "flex-row space-x-6")}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={cn("relative", isMobile ? "w-full" : "group")}
          >
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "text-white hover:text-teal-200 transition-colors py-2 flex items-center justify-between",
                  isMobile && "w-full"
                )}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>
            ) : (
              <button
                className={cn(
                  "text-white hover:text-teal-200 transition-colors py-2 flex items-center justify-between",
                  isMobile && "w-full"
                )}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className={cn("w-4 h-4 transition-transform", activeMenu === item.label ? "rotate-180" : "")} />
                )}
              </button>
            )}
            {item.children && (
              <ul
                className={cn(
                  isMobile
                    ? "mt-2 ml-4 space-y-2"
                    : "absolute top-full left-0 min-w-[200px] bg-orange-400 rounded-b-lg shadow-lg",
                  isMobile
                    ? activeMenu === item.label ? "block" : "hidden"
                    : "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                )}
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href || '#'}
                      className={cn(
                        "block px-4 py-2 text-white hover:bg-orange-500 transition-colors",
                        isMobile && "w-full"
                      )}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

