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
    <div className="min-h-screen p-6 md:p-10 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' }}>
              <span className="text-white text-2xl font-bold">🏠</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">
              Investment Opportunity
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Analyze this distressed property and discover its flip potential
          </p>
        </motion.div>

        {/* Property Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pr-card overflow-hidden mb-12 relative"
        >
          {/* Profit Potential Badge */}
          <div className="absolute top-6 right-6 z-10">
            <motion.div
              className="bg-success-500 text-white px-4 py-2 rounded-pr font-bold shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-lg">{potentialROI.toFixed(1)}%</div>
                <div className="text-xs opacity-90">ROI Potential</div>
              </div>
            </motion.div>
          </div>

          {/* Property Image */}
          <div className="h-72 md:h-96 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' }}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <motion.div 
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🏚️
                </motion.div>
                <p className="text-xl font-bold">Distressed Property</p>
                <p className="text-white/80">Ready for transformation</p>
              </div>
            </div>
            
            {/* Property Type Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="glassmorphism rounded-pr px-4 py-2">
                <span className="text-white font-medium">Single Family Home</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Address & Basic Info */}
            <div className="mb-12">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                    {selectedProperty.address}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                    {selectedProperty.description}
                  </p>
                </div>
                <div className="pr-badge-primary ml-6">
                  <span className="text-sm font-bold">Market Find</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: selectedProperty.beds, label: 'Bedrooms', icon: '🛏️' },
                  { value: selectedProperty.baths, label: 'Bathrooms', icon: '🚿' },
                  { value: selectedProperty.sqft.toLocaleString(), label: 'Sq Ft', icon: '📐' },
                  { value: selectedProperty.yearBuilt, label: 'Year Built', icon: '📅' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary-50 rounded-xl p-6 text-center border border-primary-100"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-black text-primary-700 mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-primary-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Financial Analysis */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="text-4xl mr-4">💰</span>
                Investment Analysis
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <motion.div 
                  className="bg-gradient-to-br from-error-50 to-error-100 rounded-xl p-8 border border-error-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-error-600 mb-2">Purchase Price</div>
                      <div className="text-2xl md:text-3xl font-black text-error-700">
                        {formatCurrency(selectedProperty.asIsValue)}
                      </div>
                    </div>
                    <div className="text-4xl">🏠</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl p-8 border border-warning-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-warning-600 mb-2">Estimated Repairs</div>
                      <div className="text-2xl md:text-3xl font-black text-warning-700">
                        {formatCurrency(selectedProperty.repairBudget)}
                      </div>
                    </div>
                    <div className="text-4xl">🔨</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-8 border border-success-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-success-600 mb-2">After Repair Value</div>
                      <div className="text-2xl md:text-3xl font-black text-success-700">
                        {formatCurrency(selectedProperty.afterRepairValue)}
                      </div>
                    </div>
                    <div className="text-4xl">✨</div>
                  </div>
                </motion.div>
              </div>

              {/* ROI Highlight */}
              <motion.div 
                className="rounded-xl p-10 text-center text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl font-black mb-4">
                    {potentialROI.toFixed(1)}%
                  </div>
                  <div className="text-xl md:text-2xl font-medium opacity-90 mb-8">Potential ROI</div>
                  <div className="grid grid-cols-2 gap-12 max-w-lg mx-auto">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-2">{selectedProperty.estimatedRepairTime}</div>
                      <div className="text-base opacity-80">Days to Complete</div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold mb-2">
                        {formatCurrency(selectedProperty.afterRepairValue - selectedProperty.asIsValue - selectedProperty.repairBudget)}
                      </div>
                      <div className="text-base opacity-80">Potential Profit</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <motion.button
                onClick={handleStartRenovation}
                className="pr-button-primary text-xl md:text-2xl font-bold mb-6 animate-glow px-12 py-6"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-4">
                  <span>🎯</span>
                  <span>Start Planning Renovations</span>
                  <span>🚀</span>
                </span>
              </motion.button>
              
              <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                Design your renovation strategy and see real-time ROI calculations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="text-center mt-16">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-lg"
          >
            ← Back to Welcome
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyScreen