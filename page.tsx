'use client'

import Head from 'next/head'
import Image from "next/image"
import Link from "next/link"
import { Book, Users, TreesIcon as Tree, Building, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatedSection } from "@/components/animated-section"
import { cn } from "@/lib/utils"
import { NavMenu } from '@/components/nav-menu'
import { SideMenu } from '@/components/side-menu'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
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
      </Head>
      {/* Navigation - Now with scroll effect and mobile menu */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-teal-600/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg"
              alt="亲子拾光 Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white">亲子拾光</span>
          </div>

          <NavMenu />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-teal-600/95 backdrop-blur-sm transition-transform duration-300 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-white text-2xl">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            {['首页', '机构介绍', '员工通道'].map((item) => (
              <button
                key={item}
                className="hover:text-teal-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Now with parallax effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1920')] bg-cover bg-center opacity-50"
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
      </section>

      {/* Add Side Menu */}
      <SideMenu />

      {/* Concept Section - With staggered animations */}
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

      {/* School Profile - With slide-in animation */}
      <section className="py-16 md:py-24 bg-teal-600 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">机构简介 / School Profile</h2>
                <p className="text-lg">
                  我们致力于为每一位孩子提供优质的教育资源，帮助他们在成长的道路上获得全面发展。
                  通过专业的教育团队和科学的教育方法，我们为孩子们创造良好的学习环境。
                </p>
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 transform">
                  了解更多
                </button>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <Image
                src="/placeholder.svg"
                alt="School environment"
                width={600}
                height={400}
                className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Teacher Team - With rotating animation */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">导师团队 / Teacher Team</h2>
          </AnimatedSection>
          <div className="relative w-full max-w-3xl mx-auto aspect-square">
            <AnimatedSection className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold transform hover:scale-110 transition-transform duration-300">
                核心团队
              </div>
            </AnimatedSection>
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
                <div className="w-full h-full rounded-full bg-white shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/placeholder.svg"
                    alt={`Teacher ${index + 1}`}
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

      {/* News Section - With card hover effects */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">最新动态 / News</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <AnimatedSection
                key={index}
                delay={index * 200}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={`News ${index}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">教育新闻标题</h3>
                    <p className="text-gray-600">这里是新闻简介，描述具体的新闻内容...</p>
                    <div className="mt-4">
                      <Link
                        href="#"
                        className="text-teal-600 hover:text-teal-700 inline-flex items-center group"
                      >
                        阅读更多
                        <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - With hover effects */}
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
                  src="/placeholder.svg"
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

