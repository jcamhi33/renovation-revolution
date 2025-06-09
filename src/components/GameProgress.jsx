import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

function GameProgress() {
  const currentScreen = useGameStore((state) => state.currentScreen)
  
  const steps = [
    { id: 'welcome', name: 'Start', icon: '🎯' },
    { id: 'property', name: 'Property', icon: '🏠' },
    { id: 'renovation', name: 'Plan', icon: '🔨' },
    { id: 'summary', name: 'Results', icon: '🏆' }
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentScreen)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg rounded-pr px-6 py-3 shadow-pr border border-white/30"
      >
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                  index <= currentStepIndex
                    ? 'text-white shadow-glow'
                    : 'bg-gray-200 text-gray-500'
                }`}
                style={index <= currentStepIndex ? { background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' } : {}}
                animate={index === currentStepIndex ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: index === currentStepIndex ? Infinity : 0, repeatDelay: 2 }}
              >
                <span className="text-lg">{step.icon}</span>
              </motion.div>
              
              <span className={`ml-2 text-sm font-medium ${
                index <= currentStepIndex ? 'text-primary-700' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
              
              {index < steps.length - 1 && (
                <div 
                  className={`w-8 h-1 mx-3 rounded-full transition-all duration-500 ${
                    index < currentStepIndex 
                      ? '' 
                      : 'bg-gray-200'
                  }`}
                  style={index < currentStepIndex ? { background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' } : {}}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default GameProgress