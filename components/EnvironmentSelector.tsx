'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpecSheetModal from './SpecSheetModal'

type TabId = 'hotel' | 'hospital' | 'school' | 'office'

const TABS: { id: TabId; label: string }[] = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'school', label: 'School' },
  { id: 'office', label: 'Office' },
]

const CONTENT: Record<
  TabId,
  {
    headline: string
    body: string
    stats: [string, string, string]
    cta: string
    bgClass: string
  }
> = {
    hotel: {
    headline: 'Elevate the guest experience',
    body: 'Luxury guests notice everything. NOVAIRA ensures that every amenity — even those never spoken about — reflects your commitment to thoughtful hospitality. Trusted by 4-star and 5-star properties.',
    stats: ['24 avg. units per property', 'Guest satisfaction impact', 'Silent operation'],
    cta: 'Request Hotel Pricing',
    bgClass: 'bg-amber-900/15 border-amber-700/25',
  },
  hospital: {
    headline: 'Clinical precision meets human dignity',
    body: 'NOVAIRA meets medical-grade disposal standards while ensuring patients and staff feel cared for, not processed. Designed to integrate into clinical environments without disrupting them.',
    stats: ['Medical Grade certified', 'Infection risk reduction', 'Automatic shut-off'],
    cta: 'Request Hospital Pricing',
    bgClass: 'bg-sky-900/15 border-sky-700/25',
  },
  school: {
    headline: 'Where young people deserve better',
    body: 'Students should never feel uncomfortable or embarrassed. NOVAIRA is child-safe certified, silent, and discreet — creating supportive environments where dignity is never an afterthought.',
    stats: ['Child-safe certified', '<35dB operation', 'Odorless process'],
    cta: 'Request School Pricing',
    bgClass: 'bg-emerald-900/15 border-emerald-700/25',
  },
  office: {
    headline: 'A workplace that genuinely cares',
    body: 'Forward-thinking organizations use NOVAIRA to demonstrate real commitment to employee wellbeing — not through policy documents, but through thoughtful design choices that people notice.',
    stats: ['<2 hour installation', 'Annual maintenance only', 'Energy efficient'],
    cta: 'Request Office Pricing',
    bgClass: 'bg-slate-700/20 border-slate-600/25',
  },
}

const TYPE_FOR_MODAL: Record<TabId, string> = {
  hotel: 'Hotel',
  hospital: 'Hospital',
  school: 'School',
  office: 'Office',
}

export default function EnvironmentSelector() {
  const [activeTab, setActiveTab] = useState<TabId>('hotel')
  const [specSheetOpen, setSpecSheetOpen] = useState(false)
  const [specSheetInitialType, setSpecSheetInitialType] = useState<string | undefined>(undefined)

  const handleCtaClick = (tab: TabId) => {
    setSpecSheetInitialType(TYPE_FOR_MODAL[tab])
    setSpecSheetOpen(true)
  }

  const content = CONTENT[activeTab]

  return (
    <section
      className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-12"
      aria-labelledby="environment-selector-heading"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="environment-selector-heading"
          className="text-4xl sm:text-5xl font-serif text-ivory mb-12 sm:mb-14 text-center font-medium"
        >
          Designed for your environment
        </h2>

        {/* Tabs: horizontal scroll on mobile */}
        <div
          role="tablist"
          aria-label="Environment type"
          className="flex overflow-x-auto gap-2 pb-6 -mx-1 scrollbar-thin scrollbar-thumb-rose-gold/30 scrollbar-track-transparent sm:flex-wrap sm:overflow-visible sm:justify-center sm:mx-0"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  shrink-0 px-5 py-3 rounded-lg font-light text-sm sm:text-base transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal
                  ${isActive
                    ? 'bg-rose-gold text-charcoal'
                    : 'border border-rose-gold/40 text-sand hover:border-rose-gold/70 hover:bg-rose-gold/10'
                  }
                `}
                aria-selected={isActive}
                aria-controls="environment-content"
                id={`tab-${tab.id}`}
                role="tab"
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content panel with tablist role for accessibility */}
        <div
          id="environment-content"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="rounded-xl border transition-colors duration-200 min-h-[320px] sm:min-h-[280px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-6 sm:p-8 lg:p-10 ${content.bgClass} rounded-xl border`}
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-ivory mb-4 font-medium">
                {content.headline}
              </h3>
              <p className="text-sand/90 font-light leading-relaxed mb-8 max-w-2xl">
                {content.body}
              </p>

              {/* Stats as 3 small cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {content.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-lg bg-charcoal/40 border border-rose-gold/15 text-sand/90 text-sm font-light text-center"
                  >
                    {stat}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleCtaClick(activeTab)}
                className="px-6 py-3 bg-rose-gold text-charcoal hover:bg-rose-blush transition-all duration-300 font-light rounded focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-offset-2 focus:ring-offset-charcoal"
              >
                {content.cta}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <SpecSheetModal
        isOpen={specSheetOpen}
        onClose={() => {
          setSpecSheetOpen(false)
          setSpecSheetInitialType(undefined)
        }}
        initialTypeOfSpace={specSheetInitialType}
      />
    </section>
  )
}
