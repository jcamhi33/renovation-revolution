import { create } from 'zustand'

const useGameStore = create((set, get) => ({
  // Game state
  currentScreen: 'welcome', // 'welcome', 'property', 'renovation', 'summary'
  currentProperty: null,
  selectedUpgrades: {},
  totalCost: 0,
  totalTime: 0,
  calculatedROI: 0,
  
  // User data
  userEmail: '',
  gameCompleted: false,
  
  // Gamification
  playerLevel: 1,
  playerXP: 0,
  achievements: [],
  unlockedBadges: [],
  gameStats: {
    propertiesFlipped: 0,
    totalProfit: 0,
    averageROI: 0,
    fastestFlip: Infinity,
    highestROI: 0,
    upgradesUsed: 0
  },
  
  // Actions
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  
  setCurrentProperty: (property) => set({ 
    currentProperty: property,
    selectedUpgrades: {},
    totalCost: 0,
    totalTime: 0,
    calculatedROI: 0
  }),
  
  addUpgrade: (roomType, upgrade) => {
    const state = get()
    const newUpgrades = {
      ...state.selectedUpgrades,
      [roomType]: upgrade
    }
    
    // Calculate totals
    const totalCost = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.cost, 0)
    const totalTime = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.timeAdded, 0)
    
    // Calculate ROI
    const totalROIBoost = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.roiBoost, 0)
    const enhancedARV = state.currentProperty.afterRepairValue * (1 + totalROIBoost)
    const totalInvestment = state.currentProperty.asIsValue + totalCost
    const calculatedROI = ((enhancedARV - totalInvestment) / totalInvestment) * 100
    
    set({
      selectedUpgrades: newUpgrades,
      totalCost,
      totalTime,
      calculatedROI
    })
  },
  
  removeUpgrade: (roomType) => {
    const state = get()
    const newUpgrades = { ...state.selectedUpgrades }
    delete newUpgrades[roomType]
    
    // Recalculate totals
    const totalCost = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.cost, 0)
    const totalTime = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.timeAdded, 0)
    
    // Recalculate ROI
    const totalROIBoost = Object.values(newUpgrades).reduce((sum, upgrade) => sum + upgrade.roiBoost, 0)
    const enhancedARV = state.currentProperty.afterRepairValue * (1 + totalROIBoost)
    const totalInvestment = state.currentProperty.asIsValue + totalCost
    const calculatedROI = ((enhancedARV - totalInvestment) / totalInvestment) * 100
    
    set({
      selectedUpgrades: newUpgrades,
      totalCost,
      totalTime,
      calculatedROI
    })
  },
  
  setUserEmail: (email) => set({ userEmail: email }),
  
  completeGame: () => {
    const state = get()
    const profit = state.getTotalProfit()
    const roi = state.calculatedROI
    
    // Update game stats
    const newStats = {
      ...state.gameStats,
      propertiesFlipped: state.gameStats.propertiesFlipped + 1,
      totalProfit: state.gameStats.totalProfit + profit,
      averageROI: ((state.gameStats.averageROI * state.gameStats.propertiesFlipped) + roi) / (state.gameStats.propertiesFlipped + 1),
      fastestFlip: Math.min(state.gameStats.fastestFlip, state.totalTime),
      highestROI: Math.max(state.gameStats.highestROI, roi),
      upgradesUsed: state.gameStats.upgradesUsed + Object.keys(state.selectedUpgrades).length
    }
    
    // Check for achievements
    const newAchievements = get().checkAchievements(roi, state.totalTime, profit, newStats)
    
    set({ 
      gameCompleted: true, 
      gameStats: newStats,
      achievements: [...state.achievements, ...newAchievements]
    })
  },
  
  resetGame: () => {
    const state = get()
    set({
      currentScreen: 'welcome',
      currentProperty: null,
      selectedUpgrades: {},
      totalCost: 0,
      totalTime: 0,
      calculatedROI: 0,
      userEmail: '',
      gameCompleted: false
      // Keep gamification data persistent
    })
  },
  
  // Gamification actions
  addXP: (amount) => {
    const state = get()
    const newXP = state.playerXP + amount
    const newLevel = Math.floor(newXP / 1000) + 1
    
    set({ 
      playerXP: newXP,
      playerLevel: newLevel
    })
    
    return newLevel > state.playerLevel // Level up occurred
  },
  
  unlockAchievement: (achievement) => {
    const state = get()
    if (!state.achievements.find(a => a.id === achievement.id)) {
      set({ 
        achievements: [...state.achievements, { ...achievement, unlockedAt: new Date() }]
      })
      get().addXP(achievement.points || 100)
      return true
    }
    return false
  },
  
  checkAchievements: (roi, time, profit, stats) => {
    const achievements = []
    
    // ROI-based achievements
    if (roi >= 30) achievements.push({
      id: 'roi_master',
      title: 'ROI Master',
      description: 'Achieve 30%+ ROI on a single flip',
      icon: '🔥',
      rarity: 5,
      points: 500
    })
    else if (roi >= 25) achievements.push({
      id: 'deal_destroyer',
      title: 'Deal Destroyer',
      description: 'Achieve 25%+ ROI on a flip',
      icon: '💥',
      rarity: 4,
      points: 300
    })
    else if (roi >= 20) achievements.push({
      id: 'savvy_flipper',
      title: 'Savvy Flipper',
      description: 'Achieve 20%+ ROI on a flip',
      icon: '🚀',
      rarity: 3,
      points: 200
    })
    
    // Time-based achievements
    if (time <= 45) achievements.push({
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Complete a flip in under 45 days',
      icon: '⚡',
      rarity: 4,
      points: 250
    })
    else if (time <= 60) achievements.push({
      id: 'quick_flipper',
      title: 'Quick Flipper',
      description: 'Complete a flip in under 60 days',
      icon: '🏃',
      rarity: 3,
      points: 150
    })
    
    // Profit-based achievements
    if (profit >= 100000) achievements.push({
      id: 'six_figure_flip',
      title: 'Six Figure Flip',
      description: 'Make $100K+ profit on a single flip',
      icon: '💰',
      rarity: 5,
      points: 400
    })
    else if (profit >= 50000) achievements.push({
      id: 'big_profit',
      title: 'Big Profit',
      description: 'Make $50K+ profit on a flip',
      icon: '💵',
      rarity: 3,
      points: 200
    })
    
    // Milestone achievements
    if (stats.propertiesFlipped === 1) achievements.push({
      id: 'first_flip',
      title: 'First Flip',
      description: 'Complete your first renovation',
      icon: '🏠',
      rarity: 1,
      points: 100
    })
    
    if (stats.propertiesFlipped === 5) achievements.push({
      id: 'serial_flipper',
      title: 'Serial Flipper',
      description: 'Complete 5 renovations',
      icon: '🔄',
      rarity: 3,
      points: 300
    })
    
    return achievements
  },
  
  // Helper functions
  getInvestorRank: () => {
    const { calculatedROI } = get()
    if (calculatedROI >= 25) return "Deal Destroyer"
    if (calculatedROI >= 20) return "Savvy Flipper"
    if (calculatedROI >= 15) return "Rising Investor"
    if (calculatedROI >= 10) return "Weekend Warrior"
    return "Rookie Renovator"
  },
  
  getFinalARV: () => {
    const { currentProperty, selectedUpgrades } = get()
    if (!currentProperty) return 0
    
    const totalROIBoost = Object.values(selectedUpgrades).reduce((sum, upgrade) => sum + upgrade.roiBoost, 0)
    return Math.round(currentProperty.afterRepairValue * (1 + totalROIBoost))
  },
  
  getTotalProfit: () => {
    const { currentProperty, totalCost } = get()
    if (!currentProperty) return 0
    
    const finalARV = get().getFinalARV()
    const totalInvestment = currentProperty.asIsValue + totalCost
    return finalARV - totalInvestment
  }
}))

export default useGameStore