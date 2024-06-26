// src/app/page.tsx
"use client"
// #6231f0 & #63bb00
import { useState, useEffect } from 'react'
import TextOverlay from './TextOverlay'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ClientComponent = dynamic(() => import('@/components/client'), {
  ssr: false,
})

export default function BoidsPage() {
  const [showImage, setShowImage] = useState(true)

  useEffect(() => {
    const toggleImageDisplay = () => {
      setShowImage(!showImage)
    }

    // Add any other code that relies on the `window` object here
  }, [showImage])

  return (
    <>
      {/* Conditional image overlay */}
      {showImage && (
        <div style={{ position: 'absolute', top: '50px', left: '40px', width: '50%', height: 'auto', zIndex: 3 }}>
          <Image
            src="/RESMP-DEV-5-23-2024 (1).png"
            alt="RESMP-DEV-5-23-2024 (1).png"
            width={1920}
            height={1080}
            layout="responsive"
            // New in Next.js 14
            overrideSrc="/RESMP-DEV-5-23-2024 (1).png"
            // New in Next.js 14
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
            // New in Next.js 14
            ref={(img) => {
              // Access the underlying <img> element
              console.log(img)
            }}
          />
        </div>
      )}
      {/* Text overlay */}
      <TextOverlay>
        <p>
          We are building a world class AI research lab in San Francisco, California.
          We are creating a new kind of foundation model based on nature-inspired intelligence.
          For more information, please visit our <Link href="/blog" style={{ color: '#63bb00' }}>blog</Link> and <Link href="/careers" style={{ color: '#63bb00' }}>careers</Link> page, or contact <a href="mailto:info@resmp.dev" style={{ color: '#63bb00' }}>info@resmp.dev</a>
        </p>
      </TextOverlay>
      {/* Client-side component */}
      <ClientComponent />
    </>
  )
}