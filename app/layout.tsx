import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './styles/animations.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '亲子拾光 - 专业亲子研学连锁机构',
  description: '致力于为每一位孩子提供优质的教育资源',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

