import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

function StatsPanel({ className = "" }) {
  const { 
    totalCost, 
    totalTime, 
    calculatedROI,
    selectedUpgrades,
    currentProperty 
  } = useGameStore()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: amount >= 1000000 ? 'compact' : 'standard'
    }).format(amount)
  }

  const getROIColor = (roi) => {
    if (roi >= 25) return 'text-success-600 bg-success-50'
    if (roi >= 20) return 'text-primary-600 bg-primary-50'
    if (roi >= 15) return 'text-warning-600 bg-warning-50'
    if (roi >= 10) return 'text-secondary-600 bg-secondary-50'
    return 'text-error-600 bg-error-50'
  }

  const getTimelineStatus = () => {
    if (totalTime <= 60) return { status: 'Rapid Flip', color: 'success' }
    if (totalTime <= 90) return { status: 'Standard Timeline', color: 'primary' }
    if (totalTime <= 120) return { status: 'Extended Project', color: 'warning' }
    return { status: 'Long-term Investment', color: 'error' }
  }

  const timelineStatus = getTimelineStatus()
  const upgradeCount = Object.keys(selectedUpgrades).length
  const totalRooms = currentProperty ? Object.keys(currentProperty.rooms).length : 4

  return (
    <motion.div
      className={`pr-card p-6 ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Live Stats
        </h3>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500">Progress:</span>
          <div className="pr-progress-bar w-16 h-2">
            <div 
              className="pr-progress-fill"
              style={{ width: `${(upgradeCount / totalRooms) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-primary-600">
            {upgradeCount}/{totalRooms}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* ROI Display */}
        <motion.div
          className={`p-4 rounded-xl ${getROIColor(calculatedROI)} border`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {calculatedROI.toFixed(1)}%
              </div>
              <div className="text-sm font-medium">Return on Investment</div>
            </div>
            <div className="text-3xl">
              {calculatedROI >= 25 ? '🔥' : calculatedROI >= 20 ? '🚀' : calculatedROI >= 15 ? '📈' : '💰'}
            </div>
          </div>
        </motion.div>

        {/* Cost & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-xl">
            <div className="text-lg font-bold text-error-600">{formatCurrency(totalCost)}</div>
            <div className="text-xs text-gray-600">Total Investment</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <div className="text-lg font-bold text-primary-600">{totalTime} days</div>
            <div className="text-xs text-gray-600">Timeline</div>
          </div>
        </div>

        {/* Timeline Status */}
        <div className={`p-3 rounded-xl bg-${timelineStatus.color}-50 border border-${timelineStatus.color}-200`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium text-${timelineStatus.color}-700`}>
              {timelineStatus.status}
            </span>
            <span className="text-lg">
              {timelineStatus.color === 'success' ? '⚡' : 
               timelineStatus.color === 'primary' ? '⏱️' : 
               timelineStatus.color === 'warning' ? '⏳' : '🐌'}
            </span>
          </div>
        </div>

        {/* Upgrade Summary */}
        {upgradeCount > 0 && (
          <motion.div
            className="bg-primary-50 p-3 rounded-xl border border-primary-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-sm font-medium text-primary-700 mb-2">
              Active Upgrades ({upgradeCount})
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(selectedUpgrades).map(([roomType, upgrade]) => (
                <span
                  key={roomType}
                  className="px-2 py-1 bg-white rounded text-xs font-medium text-primary-600 border border-primary-200"
                >
                  {roomType.charAt(0).toUpperCase() + roomType.slice(1)}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default StatsPanel