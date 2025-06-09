import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function AchievementBadge({ achievement, show, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!isVisible || !achievement) return null

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-accent-300 max-w-sm mx-auto text-center"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(217, 70, 239, 0.5)",
            "0 0 40px rgba(217, 70, 239, 0.8)",
            "0 0 20px rgba(217, 70, 239, 0.5)"
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          {achievement.icon}
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Achievement Unlocked!
        </h3>
        
        <h4 className="text-lg font-semibold text-accent-600 mb-2">
          {achievement.title}
        </h4>
        
        <p className="text-gray-600 text-sm mb-4">
          {achievement.description}
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="flex text-yellow-400">
            {[...Array(achievement.rarity || 3)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-lg"
              >
                ⭐
              </motion.span>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            +{achievement.points || 100} XP
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AchievementBadge