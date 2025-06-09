import { motion } from 'framer-motion'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import useGameStore from '../store/gameStore'

function SummaryScreen() {
  const { 
    currentProperty, 
    selectedUpgrades, 
    totalCost, 
    totalTime, 
    calculatedROI,
    getInvestorRank,
    getFinalARV,
    getTotalProfit,
    setCurrentScreen,
    resetGame,
    setUserEmail
  } = useGameStore()

  const [email, setEmail] = useState('')
  const [wantsTrial, setWantsTrial] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!currentProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // For demo purposes, we'll simulate the email sending
      // In production, you'd set up EmailJS with your service ID, template ID, and public key
      
      const templateParams = {
        user_email: email,
        user_name: email.split('@')[0],
        property_address: currentProperty.address,
        final_roi: calculatedROI.toFixed(1),
        investor_rank: getInvestorRank(),
        total_profit: formatCurrency(getTotalProfit()),
        final_arv: formatCurrency(getFinalARV()),
        wants_trial: wantsTrial ? 'Yes' : 'No'
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setUserEmail(email)
      setSubmitted(true)
      
    } catch (error) {
      console.error('Error sending email:', error)
      alert('There was an error sending your results. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePlayAgain = () => {
    resetGame()
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Deal Destroyer': return 'text-purple-600 bg-purple-50'
      case 'Savvy Flipper': return 'text-green-600 bg-green-50'
      case 'Rising Investor': return 'text-blue-600 bg-blue-50'
      case 'Weekend Warrior': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 'Deal Destroyer': return '🏆'
      case 'Savvy Flipper': return '💰'
      case 'Rising Investor': return '📈'
      case 'Weekend Warrior': return '🔨'
      default: return '🏠'
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Renovation Results
          </h1>
          <p className="text-lg text-gray-600">
            {currentProperty.address}
          </p>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Investor Rank */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 text-center">
            <div className="text-6xl mb-4">{getRankEmoji(getInvestorRank())}</div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl opacity-90">
              You've earned the rank of <span className="font-bold">{getInvestorRank()}</span>
            </p>
          </div>

          <div className="p-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Final Numbers</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Purchase Price</span>
                    <span className="text-lg font-bold">{formatCurrency(currentProperty.asIsValue)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Renovation Cost</span>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(totalCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Final ARV</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(getFinalARV())}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <span className="text-gray-700 font-bold">Total Profit</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency(getTotalProfit())}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Stats</h3>
                
                <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {calculatedROI.toFixed(1)}%
                  </div>
                  <div className="text-gray-600 font-medium">Return on Investment</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{totalTime}</div>
                    <div className="text-sm text-gray-600">Days Timeline</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{Object.keys(selectedUpgrades).length}</div>
                    <div className="text-sm text-gray-600">Upgrades</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Upgrades */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Renovation Plan</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(selectedUpgrades).map(([roomType, upgrade]) => (
                  <div key={roomType} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">{roomType.charAt(0).toUpperCase() + roomType.slice(1)}</h4>
                        <p className="text-gray-600">{upgrade.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{formatCurrency(upgrade.cost)}</div>
                        <div className="text-sm text-green-600">+{(upgrade.roiBoost * 100).toFixed(1)}% ROI</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Capture Form */}
        {!submitted ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Get Your Personalized Renovation Checklist
              </h2>
              <p className="text-gray-600">
                Receive a detailed breakdown of your results plus actionable tips for your next flip!
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={wantsTrial}
                    onChange={(e) => setWantsTrial(e.target.checked)}
                    className="mr-3 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm">
                    I'm interested in starting a free trial of PropertyRadar
                  </span>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Email Me My Checklist'}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Checklist Sent!
            </h2>
            <p className="text-green-700 mb-6">
              Check your email for your personalized renovation checklist and game results.
            </p>
            <p className="text-green-600 text-sm">
              {wantsTrial && "We'll also be in touch about your PropertyRadar free trial!"}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center space-x-4 mt-8"
        >
          <button
            onClick={handlePlayAgain}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Play Again
          </button>
          
          <button
            onClick={() => setCurrentScreen('renovation')}
            className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Adjust Plan
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default SummaryScreen