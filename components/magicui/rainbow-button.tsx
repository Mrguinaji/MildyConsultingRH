'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface RainbowButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const RainbowButton: React.FC<RainbowButtonProps> = ({ 
  children, 
  className, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 rounded-xl overflow-hidden",
        "text-white font-medium text-base tracking-wider",
        "group transition-all duration-300 ease-in-out",
        "bg-black hover:bg-[#1A1A1A]",
        "border border-white/10 hover:border-white/20",
        "before:absolute before:inset-0 before:z-0",
        "before:bg-gradient-to-r before:from-[#6B2737] before:via-[#B46060] before:to-[#DEB887]",
        "before:opacity-0 hover:before:opacity-100",
        "before:transition-opacity before:duration-500",
        "transform hover:scale-105 hover:shadow-lg",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  )
} 