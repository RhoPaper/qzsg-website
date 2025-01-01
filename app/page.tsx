'use client'

import Head from 'next/head'
import Image from "next/image"
import Link from "next/link"
import { Book, Users, TreesIcon as Tree, Building, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import AnimatedSection from "@/components/animated-section"
import { cn } from "@/lib/utils"
import NavMenu from '@/components/nav-menu'
import SideMenu from '@/components/side-menu'
import './styles/animations.css'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>亲子拾光 - 专业亲子研学连锁机构</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 导航栏 - 保持最新版本 */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-teal-600/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="亲子拾光"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <NavMenu />

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="切换菜单"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* 移动端菜单 */}
        <div
          className={cn(
            "fixed inset-0 bg-teal-600/95 backdrop-blur-sm transition-transform duration-300 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* 移动端菜单内容 */}
          <div className="flex flex-col items-start justify-start h-full p-4 overflow-y-auto">
            <button
              className="self-end text-white mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <NavMenu isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </nav>

      {/* 主页横幅 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/图片/主页背景')] bg-cover bg-center opacity-50"
          style={{
            transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.5 : 0}px)`
          }}
        />
        <div className="relative container mx-auto text-white text-center px-4">
          <AnimatedSection className="space-y-8">
            <div className="inline-block bg-black/50 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold space-y-4">
                <p>一切为了孩子</p>
                <p>为了孩子的一切</p>
              </div>
              <p className="text-xl md:text-2xl mt-6">All for children For all children</p>
            </div>
          </AnimatedSection>
        </div>

        {/* 公众号关注按钮 - 保持最新版本 */}
        <a
          href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ1NzkxNw==&scene=124#wechat_redirect"
          target="_blank"
          rel="noopener noreferrer"
          className="wechat-button fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
        >
          一键关注公众号
        </a>
      </section>

      {/* 添加侧边菜单 */}
      <SideMenu />

      {/* 概念部分 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">教育理念 / Concept</h2>
          </AnimatedSection>
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

      {/* 导师团队部分 - 添加旋转动画 */}
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
                className="absolute w-24 h-24 rotating-avatar"
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
            <AnimatedSection direction="up" delay={200} className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">联系我们</h3>
              <div className="space-y-2">
                <p className="hover:text-teal-400 transition-colors">地址：某某市某某区某某街道</p>
                <p className="hover:text-teal-400 transition-colors">电话：123-456-7890</p>
                <p className="hover:text-teal-400 transition-colors">邮箱：contact@example.com</p>
              </div>
            </AnimatedSection>
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
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p>© 2024 亲子拾光. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

