# 🏠 Renovation Revolution

A lightweight browser-based drag-and-drop simulation game that helps real estate investors test their renovation instincts and maximize ROI on property flips.

## 🎯 Game Concept

**Target Audience**: Real Estate Investors (Flippers + BRRRR Strategy)

**Core Hook**: Interactive renovation planning using simulated property data inspired by PropertyRadar insights (estimated ARV, repair costs, market comps, etc.)

**Goal**: Help players renovate virtual distressed properties by selecting upgrades, managing budgets, and maximizing ROI through strategic decision-making.

## 🎮 How to Play

### 1. Welcome Screen
- Overview of the game mechanics
- One-click start to begin the renovation journey

### 2. Property Selection
- Review a randomly selected distressed property
- Analyze key metrics: As-Is Value, Repair Budget, ARV, and potential ROI
- Property details include beds/baths, square footage, year built, and condition

### 3. Renovation Planning (Drag & Drop Interface)
- **Kitchen**: Upgrade appliances, countertops, cabinets
- **Bathroom**: Replace tile, install new vanity, full renovations
- **Exterior**: Landscaping, paint, curb appeal improvements
- **Investor Magic**: Skip tracing, automation tools, buyer networks

Each upgrade affects:
- 💰 **Total Cost**: Direct impact on your budget
- ⏱️ **Timeline**: Days added to project completion
- 📈 **ROI Boost**: Percentage increase in property value

### 4. Results Summary
- **Investor Rank**: From "Rookie Renovator" to "Deal Destroyer"
- **Final Metrics**: ROI percentage, total profit, timeline
- **Email Capture**: Personalized renovation checklist + PropertyRadar trial offer

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Drag & Drop**: React DnD
- **State Management**: Zustand
- **Email Integration**: EmailJS
- **Hosting**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd renovation-revolution

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to play the game locally.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
renovation-revolution/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── UpgradeCard.jsx  # Draggable renovation options
│   │   └── RoomDropZone.jsx # Drop targets for upgrades
│   ├── pages/               # Main game screens
│   │   ├── WelcomeScreen.jsx
│   │   ├── PropertyScreen.jsx
│   │   ├── RenovationScreen.jsx
│   │   └── SummaryScreen.jsx
│   ├── store/               # State management
│   │   └── gameStore.js     # Zustand store for game state
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── data/
│   └── properties.json      # Sample property data
├── public/                  # Static assets
└── vercel.json             # Deployment configuration
```

## 🎨 Game Rules & Mechanics

### ROI Calculation
```javascript
// Enhanced ARV calculation with upgrade bonuses
const totalROIBoost = selectedUpgrades.reduce((sum, upgrade) => sum + upgrade.roiBoost, 0)
const enhancedARV = baseARV * (1 + totalROIBoost)

// Final ROI percentage
const totalInvestment = purchasePrice + renovationCosts
const roi = ((enhancedARV - totalInvestment) / totalInvestment) * 100
```

### Investor Rankings
- **Deal Destroyer**: 25%+ ROI
- **Savvy Flipper**: 20-24% ROI  
- **Rising Investor**: 15-19% ROI
- **Weekend Warrior**: 10-14% ROI
- **Rookie Renovator**: <10% ROI

### Upgrade Categories

**Kitchen Upgrades**:
- Basic Refresh: $6K-12K, 12-18 days, 15-18% ROI boost
- Mid-Range Remodel: $12K-22K, 18-28 days, 25-28% ROI boost  
- High-End Renovation: $20K-35K, 28-42 days, 35-38% ROI boost

**Bathroom Upgrades**:
- Cosmetic Updates: $2.5K-5K, 6-10 days, 8-12% ROI boost
- Full Renovation: $8K-15K, 14-22 days, 18-22% ROI boost
- Luxury Upgrade: $15K-25K, 25-32 days, 28-32% ROI boost

**Exterior Improvements**:
- Paint & Landscaping: $3.5K-6K, 8-12 days, 10-14% ROI boost
- Complete Curb Appeal: $7K-12K, 15-20 days, 16-20% ROI boost
- Premium Exterior: $12K-20K, 22-35 days, 22-28% ROI boost

**Investor Magic** (PropertyRadar Features):
- Skip Tracing: $500, 2 days, 5% ROI boost
- Market Automation: $1K, 3 days, 8% ROI boost  
- Investor Network: $2K, 5 days, 12% ROI boost

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Import project from GitHub to Vercel
   - Vercel auto-detects Vite configuration
   - Deploy with one click

3. **Environment Variables** (for EmailJS):
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id  
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Manual Deployment
```bash
# Build and deploy to any static hosting
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### EmailJS Setup
1. Create account at [EmailJS](https://emailjs.com)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template for renovation checklist
4. Add credentials to environment variables

### Property Data Customization
Edit `data/properties.json` to add more property options:

```json
{
  "id": 4,
  "address": "Your Property Address",
  "yearBuilt": 1985,
  "beds": 3,
  "baths": 2,
  "sqft": 1200,
  "asIsValue": 250000,
  "repairBudget": 40000,
  "afterRepairValue": 340000,
  "estimatedRepairTime": 85,
  "description": "Property description...",
  "rooms": {
    // Room upgrade options...
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use TailwindCSS for styling
- Maintain responsive design
- Add proper TypeScript types (future enhancement)
- Write meaningful commit messages

## 📊 Future Enhancements

### Phase 2 Features
- [ ] Multiple property types (single-family, condos, multi-family)
- [ ] Regional market variations
- [ ] Financing options (cash vs. loans)
- [ ] Contractor selection mini-game
- [ ] Market timing scenarios

### Phase 3 Features  
- [ ] Multiplayer competitions
- [ ] Real market data integration
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Social sharing features

### Technical Improvements
- [ ] TypeScript migration
- [ ] Unit test coverage
- [ ] E2E testing with Playwright
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG compliance)

## 📝 License

MIT License - feel free to use this project for learning and development purposes.

## 🎯 Marketing Integration

This game serves as a lead generation tool for PropertyRadar:

- **Data Collection**: Email capture with renovation preferences
- **Value Demonstration**: Shows power of data-driven investment decisions  
- **Trial Conversion**: Direct path to PropertyRadar free trial signup
- **Brand Association**: Links fun, interactive experience with PropertyRadar brand

Perfect for social media sharing, real estate events, and investor education campaigns.

---

Built with ❤️ for real estate investors who want to level up their renovation game!