// src/app/page.tsx
"use client"
// #6231f0 & #63bb00
import { useState } from 'react'
import TextOverlay from './TextOverlay'
import Link from 'next/link'
import Image from 'next/image'
import ClientComponent from '@/components/client'

export default function BoidsPage() {
  const [showImage, setShowImage] = useState(true)

  const toggleImageDisplay = () => {
    setShowImage(!showImage)
  }

  return (
  <>
    {/* Conditional image overlay */}
    {/* You can move this div by adjusting the top, left, right, or bottom properties */}
    {/* For example, to move the div 50 pixels from the top and 40 pixels from the left, */}
    {/* you can set the style like this: */}
    {/* style={{ position: 'absolute', top: '50px', left: '40px', width: '50%', height: 'auto', zIndex: 3 }} */}
    {showImage && (
      <div style={{ position: 'absolute', top: '50px', left: '40px', width: '50%', height: 'auto', zIndex: 3 }}>
        <Image
          src="/RESMP-DEV-5-23-2024 (1).png"
          alt="/RESMP-DEV-5-23-2024 (1).png"
          width={1920}
          height={1080}
          layout="responsive"
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