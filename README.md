# PortfolioForge 🚀

A modern, user-friendly portfolio builder application that allows users to create professional portfolios through simple form inputs, with multiple templates and shareable links.

## ✨ Features

- **No Coding Required**: Simple form-based interface
- **Multiple Templates**: Choose from professionally designed templates
- **Instant Sharing**: Get a shareable link immediately
- **Real-time Preview**: See your portfolio as you build it
- **Responsive Design**: Works perfectly on all devices
- **Freemium Model**: Free basic templates, premium animated templates

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Hosting**: Vercel

## 📁 Project Structure

```
portfolio-builder/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Landing page
│   │   ├── builder/           # Portfolio builder
│   │   └── p/[slug]/          # Public portfolios
│   ├── components/
│   │   ├── landing/           # Landing page components
│   │   ├── builder/           # Builder form components
│   │   ├── templates/         # Portfolio templates
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── db/                # Database utilities
│   │   ├── auth/              # Auth configuration
│   │   └── stripe/            # Payment integration
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
└── DATABASE_SETUP.md          # Database setup guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Stripe account (for payments, optional for development)

### Installation

1. **Clone the repository**
   ```bash
   cd C:\Users\TechCE05\.gemini\antigravity\scratch\portfolio-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Stripe Configuration (Optional for development)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Follow the instructions in `DATABASE_SETUP.md` to set up your Supabase database.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### For Users

1. **Visit the landing page** to see features and templates
2. **Click "Get Started"** to begin building your portfolio
3. **Fill in the form** with your information:
   - Personal details (name, title, bio)
   - Projects with descriptions and tech stacks
   - Skills
   - Education
   - Contact information
4. **Choose a template** from available options
5. **Preview your portfolio** in real-time
6. **Publish** to get your shareable link

### Demo Portfolio

Visit `/p/demo` to see a sample portfolio with the Minimal Pro template.

### Builder Interface

Visit `/builder` to access the portfolio builder form.

## 🎨 Available Templates

### 1. Minimal Pro (Free)
- Clean, professional design
- Perfect for developers
- Single-page layout with smooth scrolling
- Project cards with tech stack display

### 2. Modern Card (Premium) - Coming Soon
- Card-based layout
- Subtle hover animations
- Interactive project showcase

### 3. Creative Grid (Premium) - Coming Soon
- Masonry-style project grid
- Bold, colorful design
- Animated section transitions

## 🗄️ Database Setup

See `DATABASE_SETUP.md` for detailed instructions on setting up your Supabase database with the required tables and security policies.

## 💳 Payment Integration

The app uses Stripe for premium template purchases. To set up:

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add keys to `.env.local`
4. Configure webhook endpoints for payment events

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - Add all environment variables from `.env.local`
   - Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain

4. **Deploy**
   - Vercel will automatically build and deploy your app
   - Your app will be live at `your-app.vercel.app`

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔐 Security

- Row Level Security (RLS) enabled on all database tables
- User authentication required for portfolio management
- Public portfolios are read-only
- Secure payment processing via Stripe

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📝 License

MIT License - feel free to use this project as you wish.

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] User authentication implementation
- [ ] Database integration for portfolio storage
- [ ] Additional premium templates
- [ ] Custom domain support
- [ ] Analytics dashboard
- [ ] Template marketplace
- [ ] Team portfolios
- [ ] Export to PDF

## 🙏 Acknowledgments

- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Animations powered by Framer Motion

---

**Made with ❤️ using PortfolioForge**
