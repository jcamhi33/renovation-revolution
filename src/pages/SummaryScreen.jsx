import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import useGameStore from '../store/gameStore'
import AchievementBadge from '../components/AchievementBadge'

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
    setUserEmail,
    completeGame,
    achievements,
    playerXP,
    playerLevel
  } = useGameStore()

  const [email, setEmail] = useState('')
  const [wantsTrial, setWantsTrial] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showAchievement, setShowAchievement] = useState(null)
  const [newAchievements, setNewAchievements] = useState([])

  useEffect(() => {
    // Complete the game and check for new achievements
    completeGame()
    
    // Show achievements one by one
    const latestAchievements = achievements.slice(-3) // Show last 3 achievements
    if (latestAchievements.length > 0) {
      setNewAchievements(latestAchievements)
      showNextAchievement(latestAchievements, 0)
    }
  }, [])

  const showNextAchievement = (achievementList, index) => {
    if (index < achievementList.length) {
      setShowAchievement(achievementList[index])
      setTimeout(() => {
        setShowAchievement(null)
        setTimeout(() => showNextAchievement(achievementList, index + 1), 500)
      }, 3000)
    }
  }

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
    <div className="min-h-screen p-6 md:p-10 pt-28" style={{ background: 'linear-gradient(135deg, #8fe7ff 0%, #45a6dd 50%, #1f77b8 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Achievement Popup */}
        <AchievementBadge 
          achievement={showAchievement} 
          show={!!showAchievement}
          onClose={() => setShowAchievement(null)}
        />

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">{getRankEmoji(getInvestorRank())}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">
              Mission Complete!
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            {currentProperty.address}
          </p>
          <div className="flex items-center justify-center space-x-8 text-white/60 text-lg">
            <div className="flex items-center space-x-2">
              <span>🏅</span>
              <span>Level {playerLevel}</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <span>⭐</span>
              <span>{playerXP.toLocaleString()} XP</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <span>🏆</span>
              <span>{achievements.length} Achievements</span>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Investor Rank Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pr-card p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1f77b8 0%, #45a6dd 50%, #8fe7ff 100%)' }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-white">
              <motion.div 
                className="text-8xl md:text-9xl mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {getRankEmoji(getInvestorRank())}
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievement Unlocked!</h2>
              <div className="text-2xl md:text-3xl font-black mb-6 bg-white/20 rounded-pr px-6 py-3 inline-block">
                {getInvestorRank()}
              </div>
              <p className="text-white/90 text-lg md:text-xl">
                You've mastered this renovation challenge
              </p>
            </div>
          </motion.div>

          {/* Performance Stats */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pr-card p-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <span className="text-4xl mr-4">📊</span>
              Performance Metrics
            </h3>
            
            <div className="space-y-8">
              <div className="text-center p-8 bg-gradient-to-r from-success-50 to-success-100 rounded-xl border border-success-200">
                <div className="text-4xl md:text-5xl font-black text-success-700 mb-3">
                  {calculatedROI.toFixed(1)}%
                </div>
                <div className="text-success-600 font-medium text-lg">Return on Investment</div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{totalTime}</div>
                  <div className="text-base text-gray-600">Days Timeline</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{Object.keys(selectedUpgrades).length}</div>
                  <div className="text-base text-gray-600">Upgrades</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-200">
                <div className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">
                  {formatCurrency(getTotalProfit())}
                </div>
                <div className="text-primary-600 font-medium text-lg">Total Profit</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pr-card p-10 mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="text-4xl mr-4">📋</span>
            Investment Breakdown
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-gradient-to-br from-error-50 to-error-100 rounded-xl p-8 border border-error-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-error-600 mb-2">Purchase Price</div>
                  <div className="text-2xl md:text-3xl font-black text-error-700">
                    {formatCurrency(currentProperty.asIsValue)}
                  </div>
                </div>
                <div className="text-4xl">💸</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl p-8 border border-warning-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-warning-600 mb-2">Renovation Cost</div>
                  <div className="text-2xl md:text-3xl font-black text-warning-700">
                    {formatCurrency(totalCost)}
                  </div>
                </div>
                <div className="text-4xl">🔨</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-8 border border-success-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-success-600 mb-2">Final Sale Price</div>
                  <div className="text-2xl md:text-3xl font-black text-success-700">
                    {formatCurrency(getFinalARV())}
                  </div>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>
          </div>

          {/* Renovation Summary */}
          <div className="mb-10">
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-6">Your Renovation Choices</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(selectedUpgrades).map(([roomType, upgrade]) => (
                <motion.div 
                  key={roomType} 
                  className="bg-primary-50 rounded-xl p-6 border border-primary-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-primary-800 flex items-center mb-2">
                        <span className="mr-3 text-2xl">
                          {roomType === 'kitchen' ? '🍳' : 
                           roomType === 'bathroom' ? '🛁' : 
                           roomType === 'exterior' ? '🏡' : '⭐'}
                        </span>
                        {roomType.charAt(0).toUpperCase() + roomType.slice(1)}
                      </h5>
                      <p className="text-primary-600 text-base">{upgrade.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-800 text-lg mb-1">{formatCurrency(upgrade.cost)}</div>
                      <div className="text-sm text-success-600 font-medium">+{(upgrade.roiBoost * 100).toFixed(1)}% ROI</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className="mb-10">
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🏆</span>
                New Achievements Unlocked
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                {newAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 border border-accent-200 text-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <div className="font-bold text-accent-800 text-base mb-2">{achievement.title}</div>
                    <div className="text-accent-600 text-sm leading-relaxed">{achievement.description}</div>
                    <div className="flex items-center justify-center mt-3 space-x-1">
                      {[...Array(achievement.rarity || 3)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-base">⭐</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Email Capture Form */}
        {!submitted ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pr-card p-10"
          >
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">📧</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Get Your Investment Report
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Receive a detailed breakdown of your results plus actionable tips for your next property flip!
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-2xl mx-auto">
              <div className="mb-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-8 py-6 border-2 border-gray-300 rounded-pr text-lg md:text-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                />
              </div>

              <div className="mb-10">
                <label className="flex items-start text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsTrial}
                    onChange={(e) => setWantsTrial(e.target.checked)}
                    className="mr-6 mt-1 w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-medium text-lg mb-2 block">
                      I'm interested in starting a free trial of PropertyRadar
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed">
                      Get access to real market data and property insights for your next investment
                    </p>
                  </div>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full pr-button-primary text-xl md:text-2xl font-bold disabled:opacity-50 py-6"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center space-x-4">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📊</span>
                      <span>Email Me My Investment Report</span>
                      <span>🚀</span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pr-card p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' }}
          >
            <motion.div
              className="text-8xl md:text-9xl mb-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-success-800 mb-6">
              Report Sent Successfully!
            </h2>
            <p className="text-lg md:text-xl text-success-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Check your email for your personalized investment report and game results.
            </p>
            {wantsTrial && (
              <div className="bg-white/50 rounded-pr px-8 py-4 inline-block">
                <p className="text-success-700 font-medium text-lg">
                  🎯 We'll also be in touch about your PropertyRadar free trial!
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex justify-center space-x-8 mt-16"
        >
          <motion.button
            onClick={handlePlayAgain}
            className="pr-button-primary text-lg md:text-xl font-bold px-8 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center space-x-3">
              <span>🎮</span>
              <span>Play Again</span>
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentScreen('renovation')}
            className="pr-button-secondary text-lg md:text-xl font-bold px-8 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center space-x-3">
              <span>🔧</span>
              <span>Adjust Plan</span>
            </span>
          </motion.button>
        </motion.div>

        {/* PropertyRadar CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="glassmorphism rounded-pr px-10 py-8 inline-flex items-center space-x-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary-600 font-black text-3xl">PR</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xl mb-2">Ready to flip real properties?</div>
              <div className="text-white/80 text-lg">Start your PropertyRadar free trial today</div>
            </div>
            <motion.button
              className="bg-white text-primary-600 px-8 py-4 rounded-pr font-bold hover:bg-gray-50 transition-colors duration-200 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SummaryScreen