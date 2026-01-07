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
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-rose-gold/20 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif text-rose-gold mb-4">Novaira</h3>
            <p className="text-sand/60 font-light text-sm leading-relaxed">
              Dignity deserves design. This is hygiene, redefined.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-light text-sand/80 mb-4 tracking-wide">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sand/60 hover:text-rose-gold transition-colors duration-300 text-sm font-light"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-light text-sand/80 mb-4 tracking-wide">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-sand/60 hover:text-rose-gold transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-rose-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sand/50 text-xs font-light mb-4 md:mb-0">
            © {currentYear} Novaira. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <a href="#" className="text-sand/50 hover:text-rose-gold transition-colors duration-300 font-light">
              Privacy Policy
            </a>
            <a href="#" className="text-sand/50 hover:text-rose-gold transition-colors duration-300 font-light">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

