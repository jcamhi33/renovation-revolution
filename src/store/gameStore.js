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
  
  completeGame: () => set({ gameCompleted: true }),
  
  resetGame: () => set({
    currentScreen: 'welcome',
    currentProperty: null,
    selectedUpgrades: {},
    totalCost: 0,
    totalTime: 0,
    calculatedROI: 0,
    userEmail: '',
    gameCompleted: false
  }),
  
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