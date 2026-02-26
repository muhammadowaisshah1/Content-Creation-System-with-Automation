# 🚀 Intelligent Content Flow

> **AI-Powered Content Automation Engine**
> Transform your ideas into optimized, ready-to-publish content with multi-layer AI reasoning.

[![Built with React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🧠 **6-Layer AI Pipeline**
- **Intent Detection** - Automatically understands your content goal
- **Strategy Layer** - Generates optimal content approach
- **Emotional Optimization** - Adds psychological persuasion
- **Content Structuring** - Organizes perfect format
- **Multi-Layer Reasoning** - Multiple AI layers working together
- **Instant Generation** - Get results in under 30 seconds

### 🎨 **Modern UI/UX**
- Glassmorphism design with gradient accents
- Smooth Framer Motion animations
- Fully responsive (mobile, tablet, desktop)
- Dark theme optimized
- Interactive hover effects
- Real-time validation feedback

### 🔒 **Enterprise-Grade Security**
- Environment variable configuration
- Input validation with Zod
- Rate limiting (5-second cooldown)
- Request timeouts (30 seconds)
- Error boundaries for crash protection
- TypeScript strict mode enabled

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/intelligent-content-flow.git

# Navigate to project directory
cd intelligent-content-flow

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your webhook URL to .env
VITE_WEBHOOK_URL=your-n8n-webhook-url-here

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see the app running! 🎉

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.8** - Type safety
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Framer Motion 12.34** - Animations
- **shadcn/ui** - Component library

### Backend Integration
- **n8n** - Workflow automation
- **Claude AI** - Content generation
- **Webhook API** - Real-time processing

### Development
- **ESLint** - Code linting
- **Vitest** - Testing framework
- **React Query** - Server state management

---

## 📁 Project Structure

```
intelligent-content-flow/
├── src/
│   ├── api/              # API service layer
│   │   └── content.ts    # Content generation API
│   ├── components/       # React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LiveDemo.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ui/           # shadcn/ui components
│   ├── constants/        # Configuration constants
│   │   └── config.ts
│   ├── hooks/            # Custom React hooks
│   │   └── use-toast.ts
│   ├── lib/              # Utility functions
│   │   ├── errors.ts     # Error handling
│   │   ├── utils.ts
│   │   └── validation.ts # Zod schemas
│   ├── pages/            # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/
│   └── favicon.svg       # App icon
├── .env.example          # Environment template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🎯 Key Components

### LiveDemo Component
Interactive demo with real-time AI content generation:
- Step-by-step form with validation
- Platform selection (YouTube, Blog, LinkedIn, Sales Page)
- Tone selection (Professional, Persuasive, Educational, Viral)
- Typewriter effect for streaming output
- Markdown rendering with custom styling

### API Service Layer
Centralized API management:
- Request timeout handling
- Error classification (ApiError, NetworkError, ValidationError)
- Response parsing for multiple formats
- User-friendly error messages

### Error Handling
Comprehensive error management:
- Custom error classes
- Error boundaries for React crashes
- Validation errors with Zod
- Network timeout handling
- User-friendly error messages

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Webhook Configuration
VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
```

### API Configuration

Edit `src/constants/config.ts`:

```typescript
export const API_CONFIG = {
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL,
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

export const RATE_LIMIT = {
  MIN_REQUEST_INTERVAL: 5000, // 5 seconds
};
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

---

## 🎨 Design System

### Colors
- **Primary:** `#4A9EFF` (Blue)
- **Accent Violet:** `#A855F7` (Purple)
- **Accent Cyan:** `#22D3EE` (Cyan)
- **Background:** Dark theme optimized

### Typography
- **Font Family:** Inter (sans-serif)
- **Monospace:** JetBrains Mono

### Animations
- Float, pulse-glow, gradient, shimmer
- Fade-in, slide-up, scale-in transitions

---

## 🚧 Roadmap

- [ ] Add user authentication
- [ ] Implement content history
- [ ] Add export functionality (PDF, DOCX)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Template library
- [ ] Collaboration features
- [ ] API rate limiting dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Muhammad Owais Shah**

Full-stack developer specializing in AI-powered applications and modern web technologies.

- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **n8n** - Workflow automation platform
- **Claude AI** - Advanced language model by Anthropic
- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

---

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

<div align="center">

**Built with ❤️ by Muhammad Owais Shah using n8n + Claude AI**

⭐ Star this repo if you find it helpful!

</div>
