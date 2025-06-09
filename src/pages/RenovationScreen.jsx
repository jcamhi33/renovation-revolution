import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'
import RoomDropZone from '../components/RoomDropZone'
import UpgradeCard from '../components/UpgradeCard'
import StatsPanel from '../components/StatsPanel'

function RenovationScreen() {
  const { 
    currentProperty, 
    selectedUpgrades, 
    totalCost, 
    totalTime, 
    calculatedROI,
    setCurrentScreen,
    addUpgrade
  } = useGameStore()

  if (!currentProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    )
  }

  const handleUpgradeSelect = (roomType, upgrade) => {
    addUpgrade(roomType, upgrade)
  }

  const handleContinueToSummary = () => {
    setCurrentScreen('summary')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getRoomName = (roomType) => {
    switch (roomType) {
      case 'kitchen': return 'Kitchen'
      case 'bathroom': return 'Bathroom'
      case 'exterior': return 'Exterior'
      case 'bonus': return 'Investor Magic'
      default: return 'Room'
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-10 pt-28" style={{ background: 'linear-gradient(135deg, #8fe7ff 0%, #45a6dd 50%, #1f77b8 100%)' }}>
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary-600 text-2xl font-bold">🔨</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">
              Design Your Renovation
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-4">
            {currentProperty.address}
          </p>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Drag upgrades to rooms or click to select • Watch your ROI change in real-time
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid xl:grid-cols-4 gap-10">
          
          {/* Stats Panel */}
          <div className="xl:col-span-1">
            <StatsPanel />
          </div>
          
          {/* Drop Zones Section */}
          <div className="xl:col-span-2 space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">🏗️</span>
                Your Renovation Plan
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(currentProperty.rooms).map(([roomType, roomData]) => (
                  <RoomDropZone
                    key={roomType}
                    roomType={roomType}
                    roomData={roomData}
                    selectedUpgrade={selectedUpgrades[roomType]}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Upgrade Options Section */}
          <div className="xl:col-span-1">
            <motion.div
              className="pr-card p-8 h-fit max-h-screen overflow-y-auto"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-3xl mr-3">🛠️</span>
                Upgrade Options
              </h2>
              
              {Object.entries(currentProperty.rooms).map(([roomType, roomData]) => (
                <div key={roomType} className="mb-10">
                  <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-6 border-b border-gray-200 pb-3 flex items-center">
                    <span className="mr-3 text-2xl">
                      {roomType === 'kitchen' ? '🍳' : 
                       roomType === 'bathroom' ? '🛁' : 
                       roomType === 'exterior' ? '🏡' : '⭐'}
                    </span>
                    {getRoomName(roomType)}
                  </h3>
                  <div className="space-y-4">
                    {roomData.repairOptions.map((upgrade, index) => (
                      <UpgradeCard
                        key={index}
                        upgrade={upgrade}
                        roomType={roomType}
                        onSelect={handleUpgradeSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center mt-16"
        >
          <button
            onClick={() => setCurrentScreen('property')}
            className="text-white/60 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-3 text-lg"
          >
            <span>←</span>
            <span>Back to Property</span>
          </button>

          <motion.button
            onClick={handleContinueToSummary}
            disabled={Object.keys(selectedUpgrades).length === 0}
            className={`pr-button-primary text-xl md:text-2xl font-bold px-12 py-6 ${
              Object.keys(selectedUpgrades).length === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'animate-glow'
            }`}
            whileHover={Object.keys(selectedUpgrades).length > 0 ? { scale: 1.05, y: -2 } : {}}
            whileTap={Object.keys(selectedUpgrades).length > 0 ? { scale: 0.98 } : {}}
          >
            <span className="flex items-center space-x-4">
              <span>📊</span>
              <span>See My Results</span>
              <span>🏆</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Gamification Hint */}
        {Object.keys(selectedUpgrades).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <div className="glassmorphism rounded-pr px-8 py-6 inline-flex items-center space-x-4">
              <span className="text-3xl animate-bounce">👆</span>
              <span className="text-white font-medium text-lg">Select at least one upgrade to continue</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RenovationScreen