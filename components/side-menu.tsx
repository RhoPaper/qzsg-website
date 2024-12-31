'use client'

import { ArrowUp, Phone, MessageCircle, QrCode } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function SideMenu() {
  const [showQR, setShowQR] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-orange-400 hover:bg-orange-500 text-white rounded flex items-center justify-center transition-colors"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      <a
        href="tel:17706497762"
        className="w-12 h-12 bg-orange-400 hover:bg-orange-500 text-white rounded flex items-center justify-center transition-colors"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="#contact"
        className="w-12 h-12 bg-orange-400 hover:bg-orange-500 text-white rounded flex items-center justify-center transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <div className="relative">
        <button
          onMouseEnter={() => setShowQR(true)}
          onMouseLeave={() => setShowQR(false)}
          className="w-12 h-12 bg-orange-400 hover:bg-orange-500 text-white rounded flex items-center justify-center transition-colors"
        >
          <QrCode className="w-6 h-6" />
        </button>
        {showQR && (
          <div className="absolute bottom-0 right-full mr-2 bg-white p-2 rounded-lg shadow-lg">
            <Image
              src="/images/qrcode.jpg"
              alt="微信二维码"
              width={128}
              height={128}
              className="w-32 h-32"
            />
          </div>
        )}
      </div>
    </div>
  )
}

