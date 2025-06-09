import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useGameStore from '../store/gameStore'
import properties from '../../data/properties.json'

function PropertyScreen() {
  const { setCurrentProperty, setCurrentScreen } = useGameStore()
  const [selectedProperty, setSelectedProperty] = useState(null)

  useEffect(() => {
    // Randomly select a property when component mounts
    const randomProperty = properties[Math.floor(Math.random() * properties.length)]
    setSelectedProperty(randomProperty)
  }, [])

  const handleStartRenovation = () => {
    if (selectedProperty) {
      setCurrentProperty(selectedProperty)
      setCurrentScreen('renovation')
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (!selectedProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const potentialROI = ((selectedProperty.afterRepairValue - selectedProperty.asIsValue - selectedProperty.repairBudget) / (selectedProperty.asIsValue + selectedProperty.repairBudget)) * 100

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Next Flip Opportunity
          </h1>
          <p className="text-lg text-gray-600">
            Review this distressed property and start planning your renovation strategy
          </p>
        </motion.div>

        {/* Property Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Property Image Placeholder */}
          <div className="h-64 md:h-80 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-lg font-medium">Property Photo</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Address & Basic Info */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {selectedProperty.address}
              </h2>
              <p className="text-gray-600 mb-4">{selectedProperty.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary-600">{selectedProperty.beds}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary-600">{selectedProperty.baths}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary-600">{selectedProperty.sqft.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary-600">{selectedProperty.yearBuilt}</div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              </div>
            </div>

            {/* Financial Data */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Overview</h3>
                
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">As-Is Value</span>
                  <span className="text-xl font-bold text-red-600">
                    {formatCurrency(selectedProperty.asIsValue)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Estimated Repairs</span>
                  <span className="text-xl font-bold text-yellow-600">
                    {formatCurrency(selectedProperty.repairBudget)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">After Repair Value (ARV)</span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(selectedProperty.afterRepairValue)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Metrics</h3>
                
                <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {potentialROI.toFixed(1)}%
                    </div>
                    <div className="text-gray-600 font-medium">Potential ROI</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Estimated Timeline</span>
                    <span className="text-lg font-bold text-gray-800">
                      {selectedProperty.estimatedRepairTime} days
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Investment</span>
                    <span className="text-lg font-bold text-gray-800">
                      {formatCurrency(selectedProperty.asIsValue + selectedProperty.repairBudget)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                onClick={handleStartRenovation}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Planning Renovations
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ← Back to Welcome
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyScreen