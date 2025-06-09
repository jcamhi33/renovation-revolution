import { motion } from 'framer-motion'
import { useDrop } from 'react-dnd'
import useGameStore from '../store/gameStore'

function RoomDropZone({ roomType, roomData, selectedUpgrade }) {
  const { addUpgrade, removeUpgrade } = useGameStore()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'upgrade',
    drop: (item) => {
      if (item.roomType === roomType) {
        addUpgrade(roomType, item.upgrade)
      }
    },
    canDrop: (item) => item.roomType === roomType,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const getRoomIcon = (type) => {
    switch (type) {
      case 'kitchen': return '🍳'
      case 'bathroom': return '🛁'
      case 'exterior': return '🏡'
      case 'bonus': return '⭐'
      default: return '🏠'
    }
  }

  const getRoomTitle = (type) => {
    switch (type) {
      case 'kitchen': return 'Kitchen'
      case 'bathroom': return 'Bathroom'
      case 'exterior': return 'Exterior'
      case 'bonus': return 'Investor Magic'
      default: return 'Room'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'poor': return 'text-red-500 bg-red-50'
      case 'dated': return 'text-orange-500 bg-orange-50'
      case 'outdated': return 'text-yellow-500 bg-yellow-50'
      case 'fair': return 'text-blue-500 bg-blue-50'
      case 'average': return 'text-gray-500 bg-gray-50'
      case 'good': return 'text-green-500 bg-green-50'
      case 'opportunity': return 'text-purple-500 bg-purple-50'
      default: return 'text-gray-500 bg-gray-50'
    }
  }

  return (
    <motion.div
      ref={drop}
      className={`relative bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 min-h-[200px] ${
        isOver && canDrop
          ? 'border-green-400 bg-green-50'
          : canDrop
          ? 'border-blue-300 border-dashed'
          : 'border-gray-200'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Room Header */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{getRoomIcon(roomType)}</div>
        <h3 className="text-xl font-bold text-gray-800">{getRoomTitle(roomType)}</h3>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(roomData.currentCondition)}`}>
          {roomData.currentCondition}
        </div>
      </div>

      {/* Current Selection or Drop Zone */}
      {selectedUpgrade ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-200"
        >
          <div className="text-center">
            <h4 className="font-semibold text-gray-800 mb-3">{selectedUpgrade.name}</h4>
            
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div>
                <div className="text-red-600 font-semibold">{formatCurrency(selectedUpgrade.cost)}</div>
                <div className="text-gray-600">Cost</div>
              </div>
              <div>
                <div className="text-blue-600 font-semibold">+{selectedUpgrade.timeAdded}d</div>
                <div className="text-gray-600">Time</div>
              </div>
              <div>
                <div className="text-green-600 font-semibold">+{(selectedUpgrade.roiBoost * 100).toFixed(1)}%</div>
                <div className="text-gray-600">ROI</div>
              </div>
            </div>

            <button
              onClick={() => removeUpgrade(roomType)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
            >
              Remove Upgrade
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <div className="text-2xl mb-2">⬇️</div>
          <p className="text-sm">
            {canDrop && isOver 
              ? 'Drop upgrade here!' 
              : 'Drag an upgrade here or click from options below'
            }
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default RoomDropZone