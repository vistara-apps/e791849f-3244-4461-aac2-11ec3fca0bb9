# RightCheck - Know Your Rights, Instantly

A production-ready Base Mini App that provides on-demand legal checklists and emergency rights alerts for common life situations.

## 🚀 Features

### Core Features
- **On-Demand Legal Checklists**: Step-by-step guidance for immediate situations like police stops or landlord entry
- **Emergency Rights Alerts**: Push notifications for new legislation and critical updates
- **Scenario-Based Guides**: Interactive modules for common life scenarios
- **Rights Glossary & FAQs**: Searchable database of legal terms and frequently asked questions

### Enhanced Features
- **Progress Tracking**: Track completion of checklist steps with visual progress bars
- **Favorites System**: Save frequently used checklists and guides
- **Purchase System**: Micro-transactions for premium content using Base wallet
- **Social Sharing**: Share completed checklists on Farcaster
- **Analytics**: Track user interactions and engagement
- **Notifications**: Real-time alerts for legal updates

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Blockchain**: Base MiniKit for wallet integration
- **Social**: Farcaster integration
- **Notifications**: React Hot Toast
- **TypeScript**: Full type safety

## 📱 Design System

### Color Palette
- **Primary**: `hsl(210, 80%, 45%)` - Professional blue
- **Accent**: `hsl(280, 70%, 50%)` - Purple for highlights
- **Background**: `hsl(215, 30%, 95%)` - Light gray
- **Surface**: `hsl(0, 0%, 100%)` - Pure white
- **Text Primary**: `hsl(210, 30%, 15%)` - Dark blue-gray
- **Text Secondary**: `hsl(210, 20%, 40%)` - Medium gray

### Typography
- **Display**: `text-2xl font-bold` - For main headings
- **Heading**: `text-lg font-semibold` - For section headers
- **Body**: `text-base leading-6` - For content
- **Caption**: `text-sm text-secondary` - For metadata

## 🏗 Architecture

### Components
- **AppShell**: Main layout wrapper with navigation
- **ActionCard**: Reusable card component for checklists, alerts, and guides
- **StepIndicator**: Visual progress indicator for checklist steps
- **SearchInput**: Enhanced search with history tracking
- **LegalTermDisplay**: Formatted display for legal definitions
- **PurchaseModal**: Secure purchase flow for premium content

### State Management
- **Zustand Store**: Centralized state with persistence
- **User State**: Profile, preferences, and purchase history
- **Progress Tracking**: Step completion and checklist progress
- **Favorites**: User-saved items
- **Search History**: Recent searches with smart suggestions

### Services
- **MiniKitService**: Base wallet integration and transactions
- **FarcasterService**: Social sharing and profile integration
- **AnalyticsService**: User interaction tracking
- **NotificationService**: Push notifications and alerts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base wallet for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/e791849f-3244-4461-aac2-11ec3fca0bb9.git
   cd e791849f-3244-4461-aac2-11ec3fca0bb9
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_BASE_CHAIN_ID=8453
   NEXT_PUBLIC_MINIKIT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FARCASTER_HUB_URL=https://hub.farcaster.xyz
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Base
Follow the [Base MiniApp deployment guide](https://docs.base.org/base-app/build-with-minikit/deployment)

## 🧪 Testing

### Run Tests
```bash
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run type-check
```

## 📊 Analytics & Monitoring

The app includes comprehensive analytics tracking:

- **User Interactions**: Checklist views, step completions, searches
- **Purchase Tracking**: Transaction success/failure rates
- **Performance Metrics**: Load times, error rates
- **User Engagement**: Session duration, feature usage

## 🔐 Security

### Data Protection
- No sensitive data stored locally
- Secure transaction handling via Base MiniKit
- Input validation and sanitization
- HTTPS enforcement

### Privacy
- Minimal data collection
- User consent for analytics
- No personal information sharing
- GDPR compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system
- Write comprehensive tests
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Base MiniKit Docs](https://docs.base.org/base-app/build-with-minikit/)
- [Farcaster Hub API](https://docs.farcaster.xyz/reference/hub-api/overview)
- [Next.js Documentation](https://nextjs.org/docs)

### Community
- [Base Discord](https://discord.gg/base)
- [Farcaster Discord](https://discord.gg/farcaster)

### Issues
Report bugs and request features via [GitHub Issues](https://github.com/vistara-apps/e791849f-3244-4461-aac2-11ec3fca0bb9/issues)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core checklist functionality
- ✅ Base wallet integration
- ✅ Basic purchase flow
- ✅ Progress tracking

### Phase 2 (Next)
- 🔄 Advanced search and filtering
- 🔄 Offline support
- 🔄 Multi-language support
- 🔄 Enhanced analytics

### Phase 3 (Future)
- 📋 AI-powered legal advice
- 📋 Community-generated content
- 📋 Legal professional network
- 📋 Advanced notification system

## 🏆 Acknowledgments

- Base team for the excellent MiniKit framework
- Farcaster community for social integration
- Legal experts who provided content guidance
- Open source contributors

---

**RightCheck** - Empowering users with instant legal knowledge and actionable steps to protect their rights. 🛡️
