'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

export default function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = false,
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!scrollerRef.current) return

    const scrollerContent = Array.from(scrollerRef.current.children)

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem)
      }
    })

    setStart(true)
  }, [])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('scroller relative z-20 max-w-7xl overflow-hidden', className)}
    >
      <div
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4',
          start && 'animate-scroll',
          reverse && 'direction-reverse',
          pauseOnHover && isHovered && 'pause-animation'
        )}
      >
        {children}
      </div>
    </div>
  )
} 