import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

function WelcomeScreen() {
  const { setCurrentScreen, playerLevel, gameStats } = useGameStore()

  const handleStartGame = () => {
    setCurrentScreen('property')
  }

  const features = [
    {
      icon: '🎯',
      title: 'Data-Driven Decisions',
      description: 'Make smart renovation choices with real market insights'
    },
    {
      icon: '💰',
      title: 'Maximize ROI',
      description: 'Learn strategies to boost your return on investment'
    },
    {
      icon: '⚡',
      title: 'Fast & Interactive',
      description: 'Drag & drop interface with real-time calculations'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Unlock badges and climb the investor leaderboard'
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-96 h-96 bg-secondary-200 rounded-full opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Player Stats (if returning player) */}
          {gameStats.propertiesFlipped > 0 && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-12"
            >
              <div className="glassmorphism rounded-pr px-8 py-4 inline-flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🏅</span>
                  <span className="font-bold text-primary-700 text-lg">Level {playerLevel}</span>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-primary-600">
                  <span className="font-medium text-lg">{gameStats.propertiesFlipped}</span> Properties Flipped
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-primary-600">
                  <span className="font-medium text-lg">{gameStats.averageROI.toFixed(1)}%</span> Avg ROI
                </div>
              </div>
            </motion.div>
          )}

          {/* Logo/Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8"
            style={{
              background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Renovation Revolution
          </motion.h1>
          
          {/* Subtitle */}
          <motion.div 
            className="mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-6">
              Master the Art of Property Flipping
            </p>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Use real market data to make smart renovation decisions and maximize your ROI
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="pr-card-hover p-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-bold text-gray-800 mb-4 text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button
              onClick={handleStartGame}
              className="pr-button-primary text-xl md:text-2xl font-bold mb-8 animate-glow px-12 py-6"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-4">
                <span>🚀</span>
                <span>Start Your Flip Journey</span>
                <span>💎</span>
              </span>
            </motion.button>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 text-white/60">
              <div className="flex items-center space-x-3">
                <span className="text-lg">⚡</span>
                <span className="text-base">3-5 min game</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🎯</span>
                <span className="text-base">Real market data</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🏆</span>
                <span className="text-base">Earn achievements</span>
              </div>
            </div>
          </motion.div>
          
          {/* Powered by PropertyRadar */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="glassmorphism rounded-pr px-10 py-6 inline-flex items-center space-x-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-600 font-black text-2xl">PR</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">Powered by PropertyRadar</div>
                <div className="text-white/70 text-base">Real estate data & insights platform</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen