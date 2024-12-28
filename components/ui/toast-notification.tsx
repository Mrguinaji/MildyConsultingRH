'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ToastNotificationProps {
  message: string
  duration?: number
  isVisible: boolean
  onClose: () => void
}

export default function ToastNotification({
  message,
  duration = 5000,
  isVisible,
  onClose
}: ToastNotificationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    if (isVisible) {
      // Jouer le son de notification
      const audio = new Audio('/sounds/notification.mp3')
      audio.play().catch(error => console.log('Erreur audio:', error))

      // Animation de la barre de progression
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        
        setProgress(newProgress)

        if (elapsed < duration) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          onClose()
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gris-neutre font-medium pr-4">
              {message}
            </p>
          </div>
          <div className="h-1 bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-terre-cuite to-bordeaux"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 