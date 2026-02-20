'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Story', href: '#story' },
    { label: 'Product', href: '#product' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Pilot', href: '#pilot-program' },
    { label: 'Press', href: '#press' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-rose-gold/20 py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 bg-charcoal/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif text-rose-gold mb-4 font-medium">NOVAIRA</h3>
            <p className="text-sand/75 font-light text-sm sm:text-base leading-relaxed max-w-sm">
              Premium sanitary disposal for hotels, hospitals, schools & offices. CE & ISO certified.
            </p>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-light text-sand/80 mb-4 tracking-wide uppercase">Navigation</h4>
            <nav className="flex flex-col space-y-2" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(link.href)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="text-sand/75 hover:text-rose-gold transition-colors duration-300 text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded px-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-light text-sand/80 mb-4 tracking-wide uppercase">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-sand/75 hover:text-rose-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded p-1"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-rose-gold/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sand/65 text-xs sm:text-sm font-light">
            © {currentYear} NOVAIRA. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
            <a 
              href="/privacy" 
              className="text-sand/65 hover:text-rose-gold transition-colors duration-300 font-light focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded px-1"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sand/65 hover:text-rose-gold transition-colors duration-300 font-light focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded px-1"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

