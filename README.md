# Novaira — Luxury Sanitary Pad Burner Website

A world-class, cinematic website for Novaira, a luxury sanitary pad burner company. This digital experience removes stigma, provides comfort, and creates a premium brand presence. Built on the belief that dignity deserves design.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
novaira-burner-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main page (assembles all sections)
│   └── globals.css          # Global styles, design system, film grain
├── components/
│   ├── Navigation.tsx       # Sticky header with scroll effects
│   ├── Hero.tsx             # Full-screen cinematic entrance
│   ├── EmotionalStory.tsx   # Poetic storytelling with staggered reveals
│   ├── ProductShowcase.tsx  # 5 key features with luxury presentation
│   ├── HowItWorks.tsx       # Simple 3-step process
│   ├── WhereItBelongs.tsx   # 5 environment showcases
│   ├── TrustSafety.tsx      # Certifications & safety reassurance
│   ├── BrandPhilosophy.tsx  # Purpose, values, and emotional core
│   ├── CallToAction.tsx     # Soft, reassuring consultation CTA
│   └── Footer.tsx           # Minimal elegant footer
└── Configuration files...
```

## 🎨 Design System

### Color Palette
- **Charcoal**: `#1a1a1a` (Primary dark background)
- **Sand**: `#f5f1ed` (Primary text)
- **Rose Gold**: `#d4a5a5` (Primary accent)
- **Rose Blush**: `#e8c7c7` (Secondary accent)
- **Ivory**: `#faf9f7` (Highlights)

### Typography
- **Headlines**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)
- **Weight**: Light (300) for luxury feel

## ✨ Features

- **Cinematic Animations**: Slow, elegant animations throughout
- **Smooth Scroll Effects**: Scroll-triggered reveals with Intersection Observer
- **Film Grain Texture**: Subtle texture overlay for premium feel
- **Responsive Design**: Mobile-first approach with adaptive typography
- **Accessibility**: WCAG AA compliant with keyboard navigation support
- **Performance**: Optimized for fast load times

## 🛠️ Built With

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📝 Customization

### Changing Content
Edit component files in `/components/` directory. Maintain the warm, empathetic tone throughout.

### Updating Colors
Edit `tailwind.config.js` and update color values in `extend.colors`.

### Adding Images
1. Create `/public/images/` directory
2. Add optimized images (JPG/PNG/WebP)
3. Import in components using Next.js Image component

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

The site is optimized for Vercel's platform with automatic Next.js optimization.

## 📞 Contact Information

Update contact details in `components/CallToAction.tsx`:
- Phone: `+1 (234) 567-890`
- Email: `hello@novairaworld.com`

## 🎯 Brand Guidelines

### Tone of Voice
✅ **Do**: Warm, empathetic, reassuring, dignified, inclusive  
❌ **Don't**: Clinical, technical, condescending, cutesy, judgmental

### Language Patterns
- **Use**: dignity, comfort, peace, respect, care, thoughtful
- **Avoid**: waste, disposal, problem, embarrassing, burn

---

**Dignity deserves design. This is hygiene, redefined.**

