import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'
import RoomDropZone from '../components/RoomDropZone'
import UpgradeCard from '../components/UpgradeCard'

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
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Plan Your Renovation
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {currentProperty.address}
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalCost)}</div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">{totalTime} days</div>
              <div className="text-sm text-gray-600">Timeline</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600">{calculatedROI.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">ROI</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Drop Zones Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Renovation Plan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(currentProperty.rooms).map(([roomType, roomData]) => (
                <RoomDropZone
                  key={roomType}
                  roomType={roomType}
                  roomData={roomData}
                  selectedUpgrade={selectedUpgrades[roomType]}
                />
              ))}
            </div>
          </div>

          {/* Upgrade Options Section */}
          <div className="bg-white rounded-xl p-6 shadow-xl h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upgrade Options</h2>
            
            {Object.entries(currentProperty.rooms).map(([roomType, roomData]) => (
              <div key={roomType} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                  {getRoomName(roomType)}
                </h3>
                <div className="space-y-3">
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
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-between items-center mt-12 max-w-4xl mx-auto"
        >
          <button
            onClick={() => setCurrentScreen('property')}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
          >
            ← Back to Property
          </button>

          <motion.button
            onClick={handleContinueToSummary}
            disabled={Object.keys(selectedUpgrades).length === 0}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              Object.keys(selectedUpgrades).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={Object.keys(selectedUpgrades).length > 0 ? { scale: 1.05 } : {}}
            whileTap={Object.keys(selectedUpgrades).length > 0 ? { scale: 0.95 } : {}}
          >
            See My Results
          </motion.button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>💡 Drag upgrades to rooms or click to select. Watch your ROI change in real-time!</p>
        </motion.div>
      </div>
    </div>
  )
}

export default RenovationScreen