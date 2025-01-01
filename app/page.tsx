'use client'

import Head from 'next/head'
import Image from "next/image"
import Link from "next/link"
import { Book, Users, TreesIcon as Tree, Building, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import AnimatedSection from "@/components/animated-section"
import { cn } from "@/lib/utils"
import NavMenu from '@/components/nav-menu'
import SideMenu from '@/components/side-menu'
import './styles/animations.css'

export default function Page() {
  // 状态管理
  const [isMenuOpen, setIsMenuOpen] = useState(false)  // 控制移动端菜单的开关状态
  const [isScrolled, setIsScrolled] = useState(false)  // 控制导航栏的滚动状态
  const [scrollY, setScrollY] = useState(0)  // 记录页面滚动位置
  const backgroundRef = useRef<HTMLDivElement>(null)  // 背景元素的引用

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      // 当滚动超过50px时，改变导航栏样式
      setIsScrolled(window.scrollY > 50)
      // 只在菜单关闭时更新滚动位置
      if (!isMenuOpen) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  // 处理背景视差效果
  useEffect(() => {
    if (backgroundRef.current) {
      // 根据滚动位置更新背景位置，实现视差效果
      backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
    }
  }, [scrollY])

  // 切换菜单状态
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      // 打开菜单时，重置滚动位置
      window.scrollTo(0, 0)
      setScrollY(0)
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>亲子拾光 - 专业亲子研学连锁机构</title>
        <link rel="icon" href="/images/logo-square.png" />
      </Head>

      {/* 导航栏 - 使用条件类名控制样式变化 */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-teal-600/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-rectangle.png"
              alt="亲子拾光"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-white p-2 hover:bg-teal-500 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="切换菜单"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 移动端菜单面板 - 使用transform实现滑入滑出效果 */}
        <div
          className={cn(
            "fixed inset-x-0 top-0 bottom-0 bg-teal-600/95 backdrop-blur-sm transition-all duration-300 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ zIndex: 1000 }}
        >
          <div className="flex flex-col items-start justify-start h-full p-4 overflow-y-auto">
            <button
              className="self-end text-white mb-4 p-2 hover:bg-teal-500 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <X className="w-6 h-6" />
            </button>
            <NavMenu isMobile={true} closeMenu={toggleMenu} />
          </div>
        </div>
      </nav>

      {/* 主页横幅 - 包含背景视差效果和标题文字 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图片 - 使用视差滚动效果 */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-[url('/图片/主页背景')] bg-cover bg-center opacity-50"
        />
        
        {/* 标题内容 */}
        <div className="relative container mx-auto text-white text-center px-4">
          <AnimatedSection className="space-y-8">
            <div className="inline-block bg-black/50 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold space-y-4">
                <p>一切为了孩子</p>
                <p>为了孩子的一切</p>
              </div>
              <p className="text-lg md:text-xl mt-6">All for children For all children</p>
            </div>
          </AnimatedSection>
        </div>

        {/* 公众号关注按钮 - 使用固定定位和动画效果 */}
        <div className="fixed left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <a
            href="公众号关注链接"
            target="_blank"
            rel="noopener noreferrer"
            className="wechat-button bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
          >
            一键关注公众号
          </a>
        </div>
      </section>

      {/* 侧边菜单 */}
      <SideMenu />

      {/* 教育理念部分 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">教育理念 / Concept</h2>
          </AnimatedSection>
          {/* 教育理念卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Book, title: "教育专业团队", color: "text-red-500" },
              { icon: Users, title: "智慧多元教育", color: "text-yellow-500" },
              { icon: Tree, title: "绿色教育理念", color: "text-green-500" },
              { icon: Building, title: "完整的成长体系", color: "text-blue-500" },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 200}
                className="flex flex-col items-center text-center"
              >
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center bg-gray-100",
                  item.color,
                  "transform hover:scale-110 transition-transform duration-300"
                )}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 导师团队部分 - 恢复为六边形布局 */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">导师团队 / Teacher Team</h2>
          </AnimatedSection>
          <div className="relative w-full max-w-3xl mx-auto aspect-square">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <AnimatedSection
                key={index}
                delay={index * 200}
                className="absolute w-24 h-24"
                style={{
                  top: `${50 + 40 * Math.sin((index * Math.PI * 2) / 6)}%`,
                  left: `${50 + 40 * Math.cos((index * Math.PI * 2) / 6)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-full h-full rounded-full bg-white shadow-lg overflow-hidden">
                  <Image
                    src={`/图片/导师${index + 1}`}
                    alt={`导师 ${index + 1}`}
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 联系信息 */}
            <AnimatedSection direction="up" delay={200} className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">联系我们</h3>
              <div className="space-y-2">
                <p className="hover:text-teal-400 transition-colors">地址：某某市某某区某某街道</p>
                <p className="hover:text-teal-400 transition-colors">电话：123-456-7890</p>
                <p className="hover:text-teal-400 transition-colors">邮箱：contact@example.com</p>
              </div>
            </AnimatedSection>
            {/* 二维码 */}
            <AnimatedSection direction="up" delay={400} className="text-center">
              <h3 className="text-xl font-bold mb-4">关注我们</h3>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/qrcode.jpg"
                  alt="QR Code"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
            </AnimatedSection>
            {/* 快速链接 */}
            <AnimatedSection direction="up" delay={600} className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4">快速链接</h3>
              <div className="space-y-2">
                {['关于我们', '课程介绍', '招生信息', '教师招聘'].map((item) => (
                  <p key={item}>
                    <Link
                      href="#"
                      className="hover:text-teal-400 transition-colors inline-flex items-center justify-center md:justify-end gap-2 group"
                    >
                      {item}
                      <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
          {/* 版权信息 */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p>© 2024 亲子拾光. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

