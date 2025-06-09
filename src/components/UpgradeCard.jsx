import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'

function UpgradeCard({ upgrade, roomType, onSelect }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'upgrade',
    item: { upgrade, roomType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getRoiColor = (roi) => {
    if (roi >= 0.3) return 'text-green-600'
    if (roi >= 0.2) return 'text-yellow-600'
    return 'text-blue-600'
  }

  return (
    <motion.div
      ref={drag}
      onClick={() => onSelect(roomType, upgrade)}
      className={`bg-white rounded-lg p-4 shadow-lg cursor-pointer border-2 border-transparent hover:border-primary-300 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <h4 className="font-semibold text-gray-800 mb-2">{upgrade.name}</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Cost:</span>
            <span className="font-semibold text-red-600">{formatCurrency(upgrade.cost)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-semibold text-blue-600">+{upgrade.timeAdded} days</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">ROI Boost:</span>
            <span className={`font-semibold ${getRoiColor(upgrade.roiBoost)}`}>
              +{(upgrade.roiBoost * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {upgrade.description && (
          <p className="text-xs text-gray-500 mt-2 italic">{upgrade.description}</p>
        )}
      </div>
    </motion.div>
  )
}

export default UpgradeCard