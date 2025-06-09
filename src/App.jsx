import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from './store/gameStore'
import WelcomeScreen from './pages/WelcomeScreen'
import PropertyScreen from './pages/PropertyScreen'
import RenovationScreen from './pages/RenovationScreen'
import SummaryScreen from './pages/SummaryScreen'
import GameProgress from './components/GameProgress'

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />
      case 'property':
        return <PropertyScreen />
      case 'renovation':
        return <RenovationScreen />
      case 'summary':
        return <SummaryScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #8fe7ff 0%, #45a6dd 50%, #1f77b8 100%)' }}>
        {/* Game Progress Bar - Show on all screens except welcome */}
        {currentScreen !== 'welcome' && <GameProgress />}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </DndProvider>
  )
}

export default App