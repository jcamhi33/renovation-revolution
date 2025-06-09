import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

function WelcomeScreen() {
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen)

  const handleStartGame = () => {
    setCurrentScreen('property')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo/Title */}
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Renovation Revolution
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Flip undervalued homes and test your renovation instincts.
          </motion.p>
          
          {/* Game Description */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl mb-10 max-w-3xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How to Play
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Choose Your Property</h3>
                  <p className="text-gray-600 text-sm">Review distressed properties with real market data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Plan Renovations</h3>
                  <p className="text-gray-600 text-sm">Drag & drop upgrades to maximize your ROI</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">See Your Results</h3>
                  <p className="text-gray-600 text-sm">Get your investor rank and renovation checklist</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Renovating
          </motion.button>
          
          {/* Powered by PropertyRadar */}
          <motion.p 
            className="text-gray-500 text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            Powered by real estate data insights
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen